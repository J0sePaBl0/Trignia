# Plan: backend de Trignia, empezando por el módulo de agenda

## Contexto

La página `/agendar` ya funciona de punta a punta, pero contra datos de ejemplo: `src/services/booking.js` del sitio inventa los horarios y simula el envío (`IS_MOCK = true`). Falta el backend real.

Además, este backend será la base de un sistema interno tipo ERP pequeño (clientes, oportunidades, reuniones, pagos, gastos). Por eso la agenda se construye como **el primer módulo de un sistema modular**, no como un servicio suelto. En este plan solo se construye la agenda; lo demás queda preparado, no implementado.

Decisiones ya tomadas:

- **Repositorio propio** (`trignia-api`), separado del sitio web.
- **TypeScript**, con Node.js y Fastify.
- **Calendario propio:** Postgres es la única fuente de verdad. No se usa Google Calendar.
- **Despliegue en Hostinger con Docker**, junto a n8n y Postgres.
- **Reuniones de 45 minutos**, de lunes a sábado.
- **n8n queda para los avisos**, no para la lógica.

Resultado esperado: la página muestra horarios reales y guarda la reserva sin duplicados; cada reserva queda como un contacto más una reunión; el equipo puede ver su agenda y bloquear tiempo.

## Supuestos a confirmar (son configuración, no cambian el diseño)

| Dato | Valor inicial | Dónde se cambia |
| --- | --- | --- |
| Horario | Lun–Vie 9:00–17:00, Sáb 9:00–12:00 | tabla `availability_rules` |
| Zona horaria del negocio | `America/Costa_Rica` (por confirmar) | variable `BUSINESS_TZ` |
| Anticipación mínima | 12 horas | variable `MIN_NOTICE_HOURS` |
| Ventana hacia adelante | 45 días (igual que el ejemplo actual) | variable `HORIZON_DAYS` |
| Subdominio del backend | `api.<tu-dominio>` | DNS + proxy |

## Arquitectura

```
Navegador ── /api/availability, /api/bookings ──> Vercel (rewrite en vercel.json)
                                                      │
                                                      ▼
                         Hostinger: proxy HTTPS ──> contenedor trignia-api (Fastify)
                                                      │  /public/*    sin sesión, con límite por IP
                                                      │  /internal/*  con autenticación
                                                      ▼            ▼
                                                  Postgres     n8n (webhook interno, avisos)
```

- **Monolito modular:** una carpeta por área, una base de datos, un despliegue.
- **Dos superficies:** `/public/*` es lo único sin autenticación (lo que usa la página). Todo lo demás vive en `/internal/*` detrás de un único guardia.
- Postgres no se expone a internet; el backend lo alcanza por la red interna de Docker.
- Si n8n falla, la reserva ya quedó guardada; solo se pierde el aviso.

## Stack

- **Node 24 + TypeScript + Fastify 5.** En desarrollo `tsx watch`; en producción se compila con `tsc`.
- **Drizzle ORM + drizzle-kit** para el esquema y las migraciones. La consulta que genera los horarios va en SQL directo.
- **Zod** para validar peticiones y variables de entorno.
- **`@fastify/rate-limit`** con `trustProxy`, porque las peticiones llegan a través de Vercel y del proxy.
- **Pruebas con `node:test`** contra un Postgres real de desarrollo.

## Estructura del repositorio nuevo

Carpeta `trignia-api`, junto a la del sitio (`trigniaweb/trignia-api`), con su propio git.

```
trignia-api/
  package.json  tsconfig.json  drizzle.config.ts
  Dockerfile  docker-compose.dev.yml  .env.example
  drizzle/                     # migraciones SQL generadas
  src/
    index.ts                   # arranca el servidor
    app.ts                     # construye la app (se reutiliza en pruebas)
    config.ts                  # variables de entorno validadas
    db/client.ts
    db/schema.ts               # reúne los esquemas de cada módulo
    shared/
      auth.ts                  # guardia de /internal
      errors.ts
      events.ts                # envía eventos a n8n
    modules/
      contacts/                # schema.ts, service.ts
      agenda/                  # schema.ts, slots.ts, service.ts, ics.ts,
                               # public.routes.ts, internal.routes.ts
  test/
```

Los módulos futuros (`opportunities`, `payments`, `expenses`) se añaden como carpetas hermanas con la misma forma.

## Convenciones para todo el sistema

- Claves `uuid`, fechas en `timestamptz`, columnas `created_at` y `updated_at`, nombres en `snake_case`.
- Los registros de negocio no se borran: cambian de `status`.
- Cuando lleguen pagos y gastos: montos en enteros (unidad mínima) más una columna de moneda.

## Base de datos

Base de datos y usuario propios (`trignia`), separados de los de n8n.

- **`contacts`**: `id`, `name`, `email`, `phone`, `clinic`, `source`, fechas. Índice único sobre `lower(email)`.
- **`meetings`**: `id`, `contact_id`, `starts_at`, `ends_at`, `status` (`confirmed` | `cancelled`), `source` (`web` | `internal`), `note`, `client_tz`, `form_data` (lo que envió el formulario, en `jsonb`), fechas.
- **`availability_rules`**: `weekday` (1 = lunes), `start_time`, `end_time`. La migración inserta el horario inicial.
- **`blocks`**: `starts_at`, `ends_at`, `reason`.

La restricción que impide reservas dobles va en una migración SQL manual, porque Drizzle no la expresa:

```sql
alter table meetings add constraint meetings_no_overlap
  exclude using gist (tstzrange(starts_at, ends_at) with &&) where (status = 'confirmed');
```

**Regla para contactos:** al reservar se busca el contacto por correo. Si no existe, se crea. Si ya existe, **no se sobrescribe** con lo que llegue del formulario público; los datos enviados quedan en `meetings.form_data`. Así nadie puede alterar un cliente del CRM usando su correo en la página.

## Endpoints

### Públicos (los que usa la página)

- **`GET /public/agenda/availability`** → `{ slots: ["2026-10-13T15:00:00.000Z", ...] }`
  - Una consulta SQL genera los candidatos: por cada día de la ventana toma las reglas de ese día de la semana y avanza de 45 en 45 minutos. Postgres convierte de hora local a UTC con `AT TIME ZONE`.
  - Descarta los anteriores a la anticipación mínima y los que se solapan con una reunión confirmada o con un bloqueo.
- **`POST /public/agenda/bookings`** con `{ start, timeZone, name, clinic, email, number, note }` → `201 { ok: true, start }`
  - Valida formato y longitudes (nota ≤ 500, igual que el formulario).
  - Comprueba que `start` sea uno de los horarios que la disponibilidad ofrecería ahora; reutiliza `agenda/slots.ts`.
  - En una transacción: busca o crea el contacto e inserta la reunión. Si Postgres rechaza por la restricción (`23P01`), responde **`409 { ok: false, code: "slot_taken" }`**.
  - Después emite el evento `meeting.created` a n8n sin bloquear la respuesta.
  - Límite: 5 peticiones por minuto por IP.

### Internos (`/internal/*`, detrás del guardia de `shared/auth.ts`)

- `GET /internal/agenda/meetings?from=&to=`
- `POST /internal/agenda/meetings/:id/cancel`
- `POST /internal/agenda/blocks` y `DELETE /internal/agenda/blocks/:id`
- `GET /internal/agenda/calendar.ics?token=`: la agenda como calendario suscribible, para verla desde el teléfono sin construir una pantalla.

En esta primera versión el guardia compara un `ADMIN_TOKEN`. Queda en un solo archivo para reemplazarlo por usuarios, roles y sesiones cuando empiece el siguiente módulo.

## Cambios en el sitio web (repo actual)

- **`src/services/booking.js`:** `fetchAvailability()` pasa a `fetch("/api/availability")` y `createBooking()` a `POST /api/bookings`. En un 409 lanza un `Error` con `code = "slot_taken"`, que `src/pages/Agendar.jsx` ya maneja. `IS_MOCK` pasa a `false`, con lo que desaparece el texto "Son horarios de ejemplo". `warmAvailability()` y `getAvailability()` no cambian.
- **`vite.config.js`:** el plugin `localApi` hoy intenta importar `api/<nombre>.js` para cualquier ruta `/api/*`. Debe dejar pasar las rutas sin archivo, y se añade `server.proxy` de `/api/availability` y `/api/bookings` hacia el backend local (`http://localhost:3001/public/agenda/...`).
- **`vercel.json`:** dos rewrites nuevos hacia `https://api.<tu-dominio>/public/agenda/availability` y `/public/agenda/bookings`. El rewrite de `/agendar` se queda.

## Orden de trabajo

1. **Base del repositorio:** crear `trignia-api`, configuración de TypeScript, Fastify, Drizzle, Postgres local con `docker-compose.dev.yml`, y las dos superficies `/public` e `/internal` vacías.
2. **Módulos `contacts` y `agenda`:** esquema, migraciones (incluida la restricción), cálculo de horarios y los dos endpoints públicos.
3. **Pruebas:**
   - Horarios: día sin reglas, sábado corto, anticipación mínima, bloqueo, reunión existente.
   - Reserva doble simultánea: debe dar un 201 y un 409.
   - Contacto existente: no se sobrescribe.
4. **Conectar la página:** los tres cambios del sitio, y probar el flujo completo en `npm run dev`.
5. **Agenda del equipo y avisos:** endpoints internos, el `.ics` y `shared/events.ts`.
6. **Despliegue en Hostinger** (pasos que corres tú o me pasas los archivos, porque no tengo acceso al servidor):
   - Revisar el `docker-compose` actual: qué proxy hay (probablemente Traefik), cómo se llama la red y si Postgres está en un contenedor o instalado en el servidor.
   - Crear la base de datos y el usuario `trignia`.
   - Añadir el servicio `trignia-api` al compose, con las etiquetas del proxy para el subdominio y HTTPS.
   - Apuntar el DNS del subdominio al servidor.
   - Cargar las variables de entorno, correr las migraciones y levantar el contenedor.
   - Programar un respaldo diario con `pg_dump` que se guarde **fuera del servidor**.
7. **Producción:** activar los rewrites en `vercel.json`, desplegar y hacer una reserva real de prueba.
8. **Flujo en n8n:** un webhook que recibe eventos del backend; para `meeting.created` envía el correo de confirmación al cliente y avisa al equipo.

## Verificación

- **Pruebas automáticas:** `npm test` en `trignia-api`.
- **A mano con curl:** pedir la disponibilidad, reservar un horario, repetir la misma reserva y ver el 409, volver a pedir la disponibilidad y confirmar que ese horario ya no sale.
- **Bloqueo:** crear un bloqueo por `/internal/agenda/blocks` y confirmar que sus horarios desaparecen.
- **Acceso:** llamar a una ruta `/internal` sin token y confirmar el 401.
- **En la página:** `npm run dev` con el backend local; reservar y ver la pantalla "Recibimos tu solicitud". Abrir dos pestañas con el mismo horario y confirmar que la segunda vuelve al calendario con el mensaje "Ese horario acaba de ocuparse".
- **Zona horaria:** cambiar la zona del navegador y confirmar que los horarios se mueven pero la reunión guardada es la misma hora en UTC.
- **En producción:** una reserva real; comprobar las filas en `contacts` y `meetings`, el correo de n8n y la suscripción al `.ics`.

## Fuera de alcance por ahora

- Los demás módulos del sistema interno: empresas, oportunidades, pagos, gastos.
- Usuarios, roles y registro de cambios (primer trabajo del siguiente módulo).
- Pantalla de administración (la agenda se ve por el `.ics` y los endpoints).
- Que el cliente cancele o reprograme desde un enlace.
- Que el formulario de contacto del sitio (`api/lead.js`) escriba en `contacts`.
- Captcha; se añade solo si el límite por IP no alcanza.

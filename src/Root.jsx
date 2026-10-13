// src/Root.jsx
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import App from "./App.jsx";
import { warmAvailability } from "./services/booking";

// Sin React.lazy: su Suspense retiene ~300 ms el contenido nuevo y deja la pantalla vacía
let Agendar = null;
const loadAgendar = () =>
  import("./pages/Agendar.jsx").then((module) => {
    Agendar = module.default;
  });

const HOME_TITLE = document.title;

const cleanPath = (pathname) => pathname.replace(/\/+$/, "") || "/";
const screenOf = (pathname) => (cleanPath(pathname) === "/agendar" ? "agendar" : "home");

export default function Root() {
  const [screen, setScreen] = useState(() => screenOf(window.location.pathname));
  const [, setLoaded] = useState(false);
  const navigated = useRef(false);
  const leftAt = useRef(0); // scroll de la pantalla que sale

  useEffect(() => {
    // El scroll lo maneja la transición; si no, el navegador lo mueve a medio fundido
    window.history.scrollRestoration = "manual";

    // Espera el código de la pantalla antes de cambiar, para no mostrar una página vacía
    const show = async (next) => {
      if (next === "agendar") {
        warmAvailability();
        try {
          await loadAgendar();
        } catch {
          window.location.reload(); // la URL ya cambió: que el navegador la cargue
          return;
        }
      }
      navigated.current = true;
      leftAt.current = window.scrollY;
      setScreen(next);
    };

    // Los enlaces internos cambian de pantalla sin recargar el documento
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.("a[href]");
      if (!link || link.target || link.hasAttribute("download")) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin || url.search || url.hash) return;
      const path = cleanPath(url.pathname);
      if (path !== "/" && path !== "/agendar") return;
      if (screenOf(path) === screenOf(window.location.pathname)) return;

      e.preventDefault();
      window.history.pushState(null, "", path);
      show(screenOf(path));
    };

    const onPopState = () => show(screenOf(window.location.pathname));

    document.addEventListener("click", onClick);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Al entrar directo por /agendar, su código se carga aquí
  useEffect(() => {
    if (screen === "agendar" && !Agendar) loadAgendar().then(() => setLoaded(true), () => {});
  }, [screen]);

  // Desde el home deja lista la pantalla de agendar y sus horarios, para que abra ya cargada
  useEffect(() => {
    if (screen !== "home") return;
    document.title = HOME_TITLE;

    const prepare = setTimeout(() => {
      loadAgendar().catch(() => {});
      warmAvailability();
    }, 1500);
    return () => clearTimeout(prepare);
  }, [screen]);

  const Page = screen === "agendar" ? Agendar : App;

  return (
    <AnimatePresence>
      {Page && (
        <Screen key={screen} fadeIn={!navigated.current} leftAt={leftAt}>
          <Page />
        </Screen>
      )}
    </AnimatePresence>
  );
}

// La pantalla nueva aparece debajo y la que sale se desvanece encima, sin pasar por vacío.
// Solo opacidad: un transform aquí rompería el navbar fijo y la tarjeta sticky.
function Screen({ fadeIn, leftAt, children }) {
  const ref = useRef(null);
  const isPresent = useIsPresent();

  // Al salir queda fija donde estaba, y el scroll vuelve arriba para la pantalla nueva
  useLayoutEffect(() => {
    if (isPresent) return;
    const el = ref.current;
    if (!el) return;

    el.inert = true;
    Object.assign(el.style, {
      position: "fixed",
      top: `${-leftAt.current}px`,
      left: "0",
      right: "0",
      zIndex: "1",
    });
    window.scrollTo(0, 0);

    return () => {
      el.inert = false;
      Object.assign(el.style, { position: "", top: "", left: "", right: "", zIndex: "" });
    };
  }, [isPresent, leftAt]);

  return (
    <motion.div
      ref={ref}
      className="isolate"
      initial={{ opacity: fadeIn ? 0 : 1 }}
      animate={{ opacity: 1, transition: { duration: 0.45, ease: "easeOut" } }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeOut" } }}
    >
      {children}
    </motion.div>
  );
}

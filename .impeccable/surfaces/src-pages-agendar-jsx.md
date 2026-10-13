---
version: 1
slug: "src-pages-agendar-jsx"
primary_target: "src/pages/Agendar.jsx"
related_targets: []
---

# Surface brief: /agendar

Scope: new route `/agendar` (`src/pages/Agendar.jsx`), built design-first against a mock booking service. Visitor mode: Persuade.

Audience and job: clinic owners and operations managers who clicked "Agendar" and are ready to commit. They pick a date and time and leave their details.

Action: request a meeting slot. Content: existing site copy only. Availability is mock data, labeled as example on the page until the backend exists.

Constraints: Calm Clinic system unchanged; Spanish copy; fields name, clinic, email, phone, optional note; times shown in the visitor's local zone, labeled. Every scheduling button on the landing links here.

Unresolved: meeting name, length and format; weekly hours and buffers; instant or pending confirmation; database provider; n8n notification.

## Direction contract

THESIS: A clinic appointment card that fills itself in as the visitor chooses. Refuses the anonymous embedded scheduler widget with a detached form.

OWN-WORLD: Mist-to-white gradient ground, glass pill nav, one white 16px card with a Clinical Teal header band and a dashed stub, Deep Forest Asap values, mint day pills, outlined time pills, green-ramp pill CTA.

STORY: The visitor sees their meeting take shape, believes booking is simple and personal, and sends their details.

FIRST VIEWPORT: Left, the appointment card at about 45% width: teal band carrying the h1 "Tu reunión con Trignia", fields Fecha, Hora and A nombre de in large Asap, dashed stub with one reassurance line. Right, the month calendar with free days as mint pills, then the selected day's time pills. The time pills are the primary action: choosing one opens the details form, as in the approved sketch, so nothing the visitor needs sits below the fold on laptop-height screens.

FORM: "La tarjeta de cita", index 4 of 7 on the ordered list; seed key 09d28417. Signature interaction: the card's fields write themselves in as date, time and name are chosen, and the stub records the request on success. Motion grammar: short ease-out value swaps and one step crossfade.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

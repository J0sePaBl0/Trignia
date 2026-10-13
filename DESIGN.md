---
name: Trignia
description: Calm, glassy, mint-and-teal website for a clinic automation and AI consultancy.
colors:
  clinical-teal: "#418C7E"
  deep-forest-teal: "#0E6B5A"
  leaf-green: "#45AD7F"
  evergreen-tertiary: "oklch(50.8% 0.118 165.612)"
  lagoon-light: "#78BFB9"
  seafoam-pale: "#A2D4CA"
  mist: "#E9F5F4"
  body-grey: "#555353"
  cta-green-start: "#16a34a"
  cta-green-mid: "#059669"
  cta-green-end: "#065f46"
typography:
  display:
    fontFamily: "Asap, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 700
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 700
  title:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
  body:
    fontFamily: "Lunasima, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.625
  label:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
rounded:
  card: "16px"
  pill: "9999px"
  panel: "24px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.cta-green-mid}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 40px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.deep-forest-teal}"
    rounded: "{rounded.pill}"
    padding: "12px 40px"
  button-nav:
    backgroundColor: "{colors.clinical-teal}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "8px 20px"
  card-problem:
    backgroundColor: "#ffffffe6"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: Trignia

## Overview

**Creative North Star: "The Calm Clinic"**

Trignia looks like a well-run clinic reception made digital: airy, clean and reassuring. Soft mint-to-white gradients wash over the page, a frosted-glass pill navbar floats above, and rounded white cards carry the content. The teal-green palette signals care and health; the clean type and generous space signal modern, dependable technology.

The system is soft and approachable rather than flashy. Depth is gentle and lifts on interaction, color is confined to a teal-green family, and motion is smooth and short. It serves clinic owners and operations managers who need to feel safe before they book a meeting.

**Key Characteristics:**
- Mint and white atmosphere with a single teal-green hue family
- Frosted-glass floating pill navigation
- Pill-shaped actions, 16px rounded cards, diffuse shadows that deepen on hover
- Centered, spacious sections that lead to one action: booking a meeting
- Real-photo or video hero behind a pale wash

## Colors

A single teal-green family on a mint-white ground; every accent is a step along the same hue.

### Primary
- **Clinical Teal** (#418C7E): brand primary. Hero subheading, nav CTA, highlight bands on cards, outline of the secondary button.
- **Deep Forest Teal** (#0E6B5A): headlines and the secondary button label. The darkest brand tone.

### Secondary
- **Leaf Green** (#45AD7F): supporting accent.
- **Evergreen** (oklch(50.8% 0.118 165.612)): heavy subtitles (`subtitles2-styles`).
- **CTA Green Ramp** (#16a34a to #059669 to #065f46): animated gradient used only on primary call-to-action buttons.

### Neutral
- **Mist** (#E9F5F4): top of page gradients and icon-circle backgrounds.
- **Lagoon Light** (#78BFB9) and **Seafoam Pale** (#A2D4CA): soft tints for illustration and decoration.
- **Body Grey** (#555353): paragraph text.

### Named Rules
**The One Hue Rule.** Every color is a teal-green or a neutral. No second accent hue is introduced.

**The Mist Ground Rule.** Section backgrounds are mint-to-white gradients, never flat saturated fills.

## Typography

**Display Font:** Asap (with system-ui)
**Headline/Title Font:** Inter (with system-ui)
**Body Font:** Lunasima (with system-ui). The CSS variable currently reads `'Ludisima'`, a typo for Lunasima, so the body font silently falls back to system-ui.

**Character:** Asap Bold gives the hero a friendly, rounded confidence; Inter keeps subheads crisp; Lunasima keeps body copy soft and readable.

### Hierarchy
- **Display** (700, clamp 3rem to 6rem, tight tracking): hero headline "LA NUEVA ERA".
- **Headline** (700, 1.5 to 1.875rem): section titles such as "¿Por qué Trignia?" in Deep Forest Teal.
- **Title** (600, 1.25rem): card titles in emerald-700.
- **Body** (500, 1rem to 1.25rem, 1.625): paragraphs in Body Grey; light weight (300) on card descriptions.
- **Label** (600, 0.875rem): nav links and buttons.

### Named Rules
**The Three Voices Rule.** Asap for display, Inter for structure, Lunasima for reading; do not add a fourth family.

## Layout

Single-page, vertically stacked sections: Hero, Problems, Steps, Why, Testimonials (hidden), Contact. Content sits in a centered `max-w-6xl` container with 24px side padding; section padding is 32px on mobile and 64px on desktop. The hero is full-screen on desktop. Text is centered in the hero and left-aligned in two-column sections that stack on mobile. Breakpoints follow Tailwind (`sm` 640px, `md` 768px, `lg` 1024px).

## Elevation & Depth

Hybrid: surfaces are mostly flat with translucent glass, and depth appears as diffuse, teal-tinted shadows that grow on hover.

### Shadow Vocabulary
- **Nav float** (`0 12px 40px -26px rgba(15,23,42,0.35)`): floating navbar.
- **Card rest** (`0 14px 40px rgba(2,6,23,0.10)`): problem cards.
- **Card hover** (`0 26px 70px rgba(5,150,105,0.20)`): green glow on hover.
- **CTA glow** (`0 30px 60px rgba(5,150,105,0.18)`): primary button hover.

### Named Rules
**The Lift On Hover Rule.** Shadows are quiet at rest and deepen only on interaction.

## Shapes

Round and friendly. Actions are full pills (9999px); cards use 16px corners; the mobile menu panel uses 24px; icons sit in circles. Borders are hairline white or black at 5% opacity (`ring-1 ring-black/5`).

## Components

### Buttons
- **Shape:** full pill (9999px).
- **Primary (CTA):** animated green gradient (#16a34a to #065f46), white 600-weight label with a chevron icon, 40px horizontal padding in the hero.
- **Secondary:** transparent, 2px Clinical Teal outline, Deep Forest label, brightness dip on hover.
- **Nav CTA:** solid Clinical Teal, smaller padding, press scale 0.99.
- **Focus:** `focus-visible` 4px emerald-200 ring with offset.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** white at 90% with a 1px black/5 ring.
- **Shadow Strategy:** see Elevation.
- **Internal Padding:** 24px; a full-width Clinical Teal highlight band closes each card with white 17px text.
- **Entrance:** fade up with blur-in, staggered 0.1s.

### Inputs / Fields
- Contact form fields live in `ContactForm.jsx`; style not yet documented.
### Navigation
Floating glass pill (`bg-white/10`, `backdrop-blur-xl`, white border), turning `bg-white/75` after 12px of scroll. Links are 14px semibold slate with emerald hover; on mobile a rounded-3xl dropdown scales in from the top.

## Do's and Don'ts

### Do:
- **Do** stay within the teal-green family on a mint-white ground.
- **Do** keep one primary action per view: book a meeting.
- **Do** use pill shapes for actions and 16px radius for cards.
- **Do** keep shadows soft and tinted; deepen them on hover.
- **Do** preserve the Trignia logo and the existing brand colors.

### Don't:
- **Don't** invent testimonials, client names or statistics; real proof does not exist yet.
- **Don't** introduce a second accent hue.
- **Don't** add a fourth font family.
- **Don't** use hard black shadows or flat saturated section fills.

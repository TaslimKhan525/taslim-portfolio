# taslim.khan — portfolio

> **I build Angular apps that actually perform.** This portfolio is the proof — not a template, not a page builder. Every demo below runs live in your browser.

**Live site:** _coming soon_ · **LinkedIn:** [linkedin.com/in/taslim3658](https://www.linkedin.com/in/taslim3658)

## What's inside

| Demo | The claim it proves |
|---|---|
| ⚡ **10,000-row grid** | "10k+ records rendered in under a second" — a hand-rolled virtual scroller (no CDK, no libraries). Only ~24 rows exist in the DOM at any moment; generation + render measured live at ~40ms. |
| 📡 **Real-time stream** | "Real-time financial workflows" — an RxJS pipeline (`toObservable → switchMap → interval`) pushing up to **200 transactions/sec** into Signals, with a hand-drawn SVG sparkline. Drag the slider; the FPS badge doesn't flinch. |
| 📊 **Live perf HUD** | The page measures itself: live FPS, First Contentful Paint, and JS transfer size straight from the Performance API. |
| ⌨️ **Ctrl+K palette** | Signals-powered command palette (`signal` + `computed` filtering) — keyboard-first navigation. |

## Engineering choices

- **Angular 20** — standalone components, Signals, `@for`/`@if` control flow
- **OnPush change detection everywhere** — no wasted render cycles
- **Zero UI libraries** — every component, the virtual scroller, and the sparkline are hand-built (~83 KB total transfer)
- **Accessible by default** — honors `prefers-reduced-motion`, semantic landmarks, keyboard navigation

## Run it

```bash
npm install
npm start        # http://localhost:4200
```

## Structure

```
src/app/
├── sections/          # hero, perf-demo, stream-demo, case-studies, skills, writing, contact
├── shared/            # reveal directive, perf HUD, command palette
└── app.ts             # shell
```

---

Built by **Taslim Khan** — Frontend Engineer · Angular Specialist · FinTech & Aviation.
Open to Senior Frontend / Frontend Engineer roles: [taslim3658@gmail.com](mailto:taslim3658@gmail.com)

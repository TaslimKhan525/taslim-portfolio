import { ChangeDetectionStrategy, Component } from '@angular/core';

interface CaseStudy {
  org: string;
  role: string;
  period: string;
  title: string;
  story: string;
  wins: string[];
  stack: string[];
}

@Component({
  selector: 'app-case-studies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="work">
      <p class="section-tag">case studies</p>
      <h2 class="section-title">Production work, real stakes.</h2>
      <p class="section-sub">
        Enterprise platforms where performance and reliability weren't nice-to-haves —
        banks and airports don't tolerate slow UIs.
      </p>

      <div class="cases">
        @for (c of cases; track c.org) {
          <article class="card case">
            <header>
              <div>
                <h3>{{ c.title }}</h3>
                <p class="meta">{{ c.role }} · {{ c.org }} · {{ c.period }}</p>
              </div>
            </header>
            <p class="story">{{ c.story }}</p>
            <ul class="wins">
              @for (w of c.wins; track w) {
                <li>{{ w }}</li>
              }
            </ul>
            <div class="stack">
              @for (s of c.stack; track s) {
                <span class="chip">{{ s }}</span>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .cases { display: grid; gap: 26px; }
    .case h3 { margin: 0 0 4px; font-size: 21px; color: var(--text); }
    .meta { margin: 0 0 14px; font-size: 13.5px; color: var(--accent); font-family: var(--mono); }
    .story { color: var(--text-dim); margin: 0 0 16px; }
    .wins { margin: 0 0 18px; padding-left: 20px; color: var(--text-dim); }
    .wins li { margin-bottom: 7px; }
    .wins li::marker { color: var(--accent); }
    .stack { display: flex; flex-wrap: wrap; gap: 8px; }
  `,
})
export class CaseStudies {
  readonly cases: CaseStudy[] = [
    {
      org: 'Datanimbus',
      role: 'Technical Engineer — Frontend',
      period: '2025 – present',
      title: 'UPP FinHub AI — core banking, sub-2s dashboards',
      story:
        'A core banking platform integrated with SBI, HDFC, ICICI and 5+ major Indian banks — real-time account visibility, transaction initiation, and loan tracking in a single dashboard.',
      wins: [
        'Re-architected the rendering strategy — Signals, OnPush, route-level lazy loading — cutting initial load ~40% (verified via Lighthouse & DevTools).',
        'Designed a modular Angular component library adopted by 8+ feature teams, accelerating delivery ~25%.',
        'Engineered a reactive RxJS/NgRx state layer that keeps account, transaction and loan views consistent under high-frequency real-time updates.',
        'Implemented JWT auth and secure API-integration patterns to banking-grade security requirements.',
      ],
      stack: ['Angular 17', 'Signals', 'NgRx', 'RxJS', 'TypeScript', 'Node.js', 'MongoDB'],
    },
    {
      org: 'Rsmart Aviation Software',
      role: 'Software Engineer',
      period: '2023 – 2025',
      title: 'Aviation ops platform — 5 modules, 3–5 airports',
      story:
        'Owned and shipped 5 enterprise aviation modules used daily by 100–200 ground-operations staff — turnaround management, workforce rostering, GSE tracking, revenue and billing.',
      wins: [
        'Led a zero-downtime Angular 8→17 migration of the live multi-module platform — restructured into lazy-loaded modular architecture.',
        'Engineered data-heavy grids rendering 10,000+ records in under 1 second (virtual scrolling, server-side pagination, RxJS).',
        'Built a rostering system that cut workforce scheduling delays 25% for 100+ staff — directly improving aircraft turnaround.',
        'Automated multi-currency contract billing to 100% accuracy, eliminating revenue leakage.',
        'Mentored 3 junior developers; introduced SOLID team-wide, raising first-pass PR approval rates.',
      ],
      stack: ['Angular 8→17', 'RxJS', 'TypeScript', 'DayPilot', 'REST APIs', 'Jasmine/Karma'],
    },
    {
      org: 'CI Services',
      role: 'Frontend Developer Intern',
      period: '2022 – 2023',
      title: 'Legacy modernisation — jQuery to Angular 14',
      story:
        'Migrated 3 legacy jQuery/AngularJS client applications to Angular 14 and built reusable foundations for future projects.',
      wins: [
        'Cut average page load ~20% and long-term maintenance overhead across client teams.',
        'Component library reused across 4 client projects — ~30% faster feature scaffolding.',
        'Checkout-flow improvements tracked to an 18% reduction in cart abandonment.',
      ],
      stack: ['Angular 14', 'JavaScript', 'HTML5', 'SCSS', 'Bootstrap'],
    },
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="skills">
      <p class="section-tag">toolkit</p>
      <h2 class="section-title">What I work with.</h2>
      <div class="groups">
        @for (g of groups; track g.name) {
          <div class="card group">
            <h3>{{ g.name }}</h3>
            <div class="chips">
              @for (s of g.items; track s) {
                <span class="chip">{{ s }}</span>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .groups {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .group h3 {
      margin: 0 0 14px;
      font-size: 15px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--accent);
      font-family: var(--mono);
    }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  `,
})
export class Skills {
  readonly groups = [
    {
      name: 'Frontend',
      items: [
        'Angular (v8–17)', 'Standalone Components', 'Angular Signals', 'TypeScript',
        'JavaScript (ES6+)', 'RxJS', 'NgRx', 'Reactive Forms', 'HTML5', 'SCSS',
        'Tailwind CSS', 'PrimeNG',
      ],
    },
    {
      name: 'Architecture',
      items: [
        'Micro-Frontend', 'Component Libraries', 'State Management',
        'Performance Optimization', 'Core Web Vitals', 'Lazy Loading',
        'OnPush Change Detection', 'SOLID', 'Code Splitting', 'Virtual Scrolling',
      ],
    },
    {
      name: 'Backend & APIs',
      items: [
        'Node.js', 'RESTful APIs', 'JWT Auth', 'MongoDB', 'MySQL', 'Firebase',
      ],
    },
    {
      name: 'Tools & DevOps',
      items: [
        'Git', 'GitHub Actions', 'Kubernetes (basics)', 'Jenkins', 'Postman',
        'Chrome DevTools', 'Jasmine/Karma', 'Agile/Scrum',
      ],
    },
  ];
}

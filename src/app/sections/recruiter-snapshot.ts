import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SnapshotCard {
  title: string;
  text: string;
  tags: string[];
}

@Component({
  selector: 'app-recruiter-snapshot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section snapshot" id="snapshot">
      <p class="section-tag">recruiter snapshot</p>
      <h2 class="section-title">Where I fit best.</h2>
      <p class="section-sub">
        Best match for Angular Developer, Senior Angular Developer, Frontend Engineer, and
        Angular-focused Software Engineer roles that need enterprise product delivery experience.
      </p>

      <div class="snapshot-grid">
        @for (card of cards; track card.title) {
          <article class="card snapshot-card">
            <h3>{{ card.title }}</h3>
            <p>{{ card.text }}</p>
            <div class="chips">
              @for (tag of card.tags; track tag) {
                <span class="chip">{{ tag }}</span>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .snapshot {
      padding-top: 56px;
    }
    .snapshot-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 20px;
    }
    .snapshot-card {
      min-height: 100%;
    }
    .snapshot-card h3 {
      margin: 0 0 10px;
      color: var(--text);
      font-size: 19px;
      line-height: 1.25;
    }
    .snapshot-card p {
      margin: 0 0 18px;
      color: var(--text-dim);
      font-size: 14.5px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    @media (max-width: 900px) {
      .snapshot-grid { grid-template-columns: 1fr; }
    }
  `,
})
export class RecruiterSnapshot {
  readonly cards: SnapshotCard[] = [
    {
      title: 'Angular-first engineering',
      text:
        'Primary strength is Angular application development across enterprise workflows, forms, reusable components, API-driven screens, and RxJS-based state.',
      tags: ['Angular 8-17', 'TypeScript', 'RxJS', 'Reactive Forms', 'Reusable Components'],
    },
    {
      title: 'Workflow-heavy products',
      text:
        'Experience is strongest where the UI has business process complexity: maker-checker flows, transaction states, scheduling, documents, filters, and operational dashboards.',
      tags: ['Maker-Checker', 'Scheduling', 'Data Tables', 'Role-Based UI', 'State-Driven UI'],
    },
    {
      title: 'Production delivery range',
      text:
        'Frontend-focused engineer with practical cross-stack collaboration, deployment support, troubleshooting, and performance investigation exposure.',
      tags: ['REST APIs', 'Jenkins', 'Windows Server', 'Kubernetes Exposure', 'Debugging'],
    },
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-writing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="writing">
      <p class="section-tag">writing</p>
      <h2 class="section-title">I write about Angular.</h2>
      <p class="section-sub">
        Short, practical posts on performance and architecture — the same techniques
        running in the demo above.
      </p>
      <div class="posts">
        @for (p of posts; track p.title) {
          <a class="card post" [href]="p.url" target="_blank" rel="noopener">
            <h3>{{ p.title }}</h3>
            <p>{{ p.blurb }}</p>
            <span class="read">Read on LinkedIn ↗</span>
          </a>
        }
      </div>
    </section>
  `,
  styles: `
    .posts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 20px;
    }
    .post { text-decoration: none; display: block; }
    .post h3 { margin: 0 0 10px; font-size: 17px; color: var(--text); }
    .post p { margin: 0 0 14px; font-size: 14px; color: var(--text-dim); }
    .read { font-size: 13.5px; color: var(--accent); font-family: var(--mono); }
  `,
})
export class Writing {
  readonly posts = [
    {
      title: 'Build Angular on SOLID',
      blurb: 'How the five SOLID principles map to components, services, and DI in real Angular apps.',
      url: 'https://www.linkedin.com/in/taslim3658/recent-activity/all/',
    },
    {
      title: 'Supercharge *ngFor with trackBy',
      blurb: 'The one-line change that stops Angular re-rendering entire lists — and why it matters at 10k rows.',
      url: 'https://www.linkedin.com/in/taslim3658/recent-activity/all/',
    },
    {
      title: 'OnPush change detection, explained',
      blurb: 'Cut redundant checks and unlock high-performance UIs by changing one component flag.',
      url: 'https://www.linkedin.com/in/taslim3658/recent-activity/all/',
    },
  ];
}

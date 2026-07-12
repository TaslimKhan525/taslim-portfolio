import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="contact">
      <div class="card contact-card">
        <p class="section-tag">contact</p>
        <h2 class="section-title">Looking for an Angular-focused engineer?</h2>
        <p class="section-sub">
          Open to Angular Developer, Senior Angular Developer, Frontend Engineer, and
          Angular-focused Software Engineer roles. Best way to reach me:
        </p>
        <div class="cta-row">
          <a class="btn btn-primary" href="mailto:taslim3658&#64;gmail.com">✉ taslim3658&#64;gmail.com</a>
          <a class="btn btn-ghost" href="https://www.linkedin.com/in/taslim3658" target="_blank" rel="noopener">
            LinkedIn ↗
          </a>
        </div>
      </div>
      <footer>
        <p>
          Built with Angular {{ ngVersion }} using standalone components and Signals.
          <a href="https://github.com/TaslimKhan525/taslim-portfolio" target="_blank" rel="noopener">source on GitHub</a>
        </p>
      </footer>
    </section>
  `,
  styles: `
    .contact-card { text-align: center; padding: 56px 32px; }
    .contact-card:hover { transform: none; }
    .contact-card .section-sub { margin-left: auto; margin-right: auto; }
    .cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
    footer {
      text-align: center;
      margin-top: 48px;
      color: var(--text-faint);
      font-size: 13.5px;
    }
    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
  `,
})
export class Contact {
  readonly ngVersion = '20';
}

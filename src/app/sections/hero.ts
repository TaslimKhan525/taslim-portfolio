import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';

interface Stat {
  prefix: string;
  target: number;
  suffix: string;
  label: string;
  current: WritableSignal<number>;
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="top">
      <div class="hero-inner">
        <p class="kicker">// frontend engineer · angular specialist</p>
        <h1>
          I build Angular apps that<br />
          <span class="glow">actually perform.</span>
        </h1>
        <p class="lede">
          Nearly 4 years across <strong>FinTech</strong> and <strong>Aviation</strong> —
          real-time banking dashboards, airport ground operations, and data-heavy UIs
          that render <strong>10,000+ records in under a second</strong>.
        </p>
        <div class="cta-row">
          <a class="btn btn-primary" href="#demo">See the live demo ⚡</a>
          <a class="btn btn-ghost" href="#work">Case studies</a>
        </div>
        <div class="stat-strip">
          @for (s of stats; track s.label) {
            <div class="stat">
              <span class="stat-value">{{ s.prefix }}{{ s.current() }}{{ s.suffix }}</span>
              <span class="stat-label">{{ s.label }}</span>
            </div>
          }
        </div>
        <p class="palette-hint">
          press <kbd>Ctrl</kbd> + <kbd>K</kbd> to navigate like a dev
        </p>
      </div>
    </section>
  `,
  styles: `
    .hero {
      min-height: 92vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse 60% 50% at 70% 20%, rgba(43, 164, 234, 0.10), transparent),
        radial-gradient(ellipse 50% 40% at 20% 80%, rgba(43, 164, 234, 0.06), transparent);
    }
    /* animated blueprint grid */
    .hero::before {
      content: '';
      position: absolute;
      inset: -60px;
      background-image:
        linear-gradient(rgba(43, 164, 234, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(43, 164, 234, 0.05) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%);
      animation: grid-pan 26s linear infinite;
      pointer-events: none;
    }
    @keyframes grid-pan {
      to { transform: translate(56px, 56px); }
    }
    .hero-inner { max-width: 1080px; margin: 0 auto; padding: 96px 24px 64px; position: relative; }
    .kicker {
      font-family: var(--mono);
      color: var(--accent);
      font-size: 15px;
      margin: 0 0 18px;
    }
    h1 {
      font-size: clamp(38px, 6.5vw, 68px);
      line-height: 1.08;
      font-weight: 800;
      margin: 0 0 22px;
      letter-spacing: -1px;
    }
    .glow {
      color: var(--accent);
      text-shadow: 0 0 34px var(--accent-glow);
    }
    .lede {
      font-size: clamp(16px, 2vw, 19px);
      color: var(--text-dim);
      max-width: 620px;
      margin: 0 0 34px;
    }
    .lede strong { color: var(--text); }
    .cta-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 56px; }
    .stat-strip {
      display: flex;
      gap: 42px;
      flex-wrap: wrap;
      border-top: 1px solid var(--line);
      padding-top: 28px;
    }
    .stat { display: flex; flex-direction: column; }
    .stat-value {
      font-family: var(--mono);
      font-size: 28px;
      font-weight: 700;
      color: var(--accent);
      font-variant-numeric: tabular-nums;
    }
    .stat-label { font-size: 13.5px; color: var(--text-faint); }
    .palette-hint {
      margin: 40px 0 0;
      font-size: 13px;
      color: var(--text-faint);
    }
    kbd {
      font-family: var(--mono);
      font-size: 12px;
      padding: 2px 7px;
      border: 1px solid var(--line);
      border-bottom-width: 2px;
      border-radius: 5px;
      background: var(--bg-raised);
      color: var(--text-dim);
    }
  `,
})
export class Hero {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly stats: Stat[] = [
    { prefix: '~', target: 40, suffix: '%', label: 'faster initial load', current: signal(0) },
    { prefix: '', target: 10, suffix: 'k+', label: 'records < 1s', current: signal(0) },
    { prefix: '8→', target: 17, suffix: '', label: 'zero-downtime migration', current: signal(8) },
    { prefix: '', target: 8, suffix: '+', label: 'teams on my component library', current: signal(0) },
  ];

  constructor() {
    afterNextRender(() => {
      const strip = this.el.nativeElement.querySelector('.stat-strip');
      if (!strip) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          this.countUp();
        },
        { threshold: 0.4 },
      );
      io.observe(strip);
    });
  }

  private countUp(): void {
    const DURATION = 1100;
    const t0 = performance.now();
    const from = this.stats.map((s) => s.current());

    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
      for (let i = 0; i < this.stats.length; i++) {
        const s = this.stats[i];
        s.current.set(Math.round(from[i] + (s.target - from[i]) * ease));
      }
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
}

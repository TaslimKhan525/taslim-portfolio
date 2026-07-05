import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

/**
 * A portfolio that measures itself: live FPS, First Contentful Paint,
 * and total JS transferred — straight from the browser's Performance API.
 */
@Component({
  selector: 'app-perf-hud',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `
    <aside class="hud" title="Live metrics for this very page — Performance API, no tricks">
      <span class="dot" [class.good]="fps() >= 55"></span>
      <span class="v">{{ fps() }}<small>fps</small></span>
      @if (fcpMs(); as fcp) {
        <span class="sep">·</span>
        <span class="v">{{ fcp | number: '1.0-0' }}<small>ms FCP</small></span>
      }
      @if (jsKb(); as kb) {
        <span class="sep">·</span>
        <span class="v">{{ kb | number: '1.0-0' }}<small>KB JS</small></span>
      }
    </aside>
  `,
  styles: `
    .hud {
      position: fixed;
      bottom: 16px;
      right: 16px;
      z-index: 90;
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid var(--line);
      background: rgba(10, 26, 48, 0.85);
      backdrop-filter: blur(8px);
      font-family: var(--mono);
      font-size: 13px;
      color: var(--text-dim);
      cursor: default;
      user-select: none;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--warn);
      transition: background 0.3s ease;
    }
    .dot.good { background: var(--ok); box-shadow: 0 0 8px var(--ok); }
    .v { color: var(--text); font-weight: 600; }
    .v small { color: var(--text-faint); font-weight: 400; margin-left: 2px; }
    .sep { color: var(--text-faint); }
    @media (max-width: 560px) { .hud { display: none; } }
  `,
})
export class PerfHud {
  readonly fps = signal(60);
  readonly fcpMs = signal<number | null>(null);
  readonly jsKb = signal<number | null>(null);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      // First Contentful Paint + JS transfer size, from the Performance API.
      const fcp = performance
        .getEntriesByType('paint')
        .find((e) => e.name === 'first-contentful-paint');
      if (fcp) this.fcpMs.set(fcp.startTime);

      const js = performance
        .getEntriesByType('resource')
        .filter((r): r is PerformanceResourceTiming => r instanceof PerformanceResourceTiming)
        .filter((r) => r.initiatorType === 'script')
        .reduce((sum, r) => sum + (r.transferSize || 0), 0);
      if (js > 0) this.jsKb.set(js / 1024);

      // Live FPS: count frames, publish twice a second.
      let frames = 0;
      let last = performance.now();
      let rafId = 0;
      const tick = (now: number) => {
        frames++;
        if (now - last >= 500) {
          this.fps.set(Math.min(120, Math.round((frames * 1000) / (now - last))));
          frames = 0;
          last = now;
        }
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      destroyRef.onDestroy(() => cancelAnimationFrame(rafId));
    });
  }
}

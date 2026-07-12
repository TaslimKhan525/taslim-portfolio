import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Txn {
  id: number;
  ref: string;
  account: string;
  type: 'NEFT' | 'RTGS' | 'IMPS' | 'UPI';
  amount: number;
  status: 'SETTLED' | 'PENDING' | 'REVIEW';
  time: string;
}

const ROW_HEIGHT = 38;
const VIEWPORT_HEIGHT = 456;
const OVERSCAN = 6;

/**
 * Portfolio demo: a hand-rolled virtual scroller. This is an interaction sample,
 * not a claim about confidential production data volume or business outcomes.
 */
@Component({
  selector: 'app-perf-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `
    <section class="section" id="demo">
      <p class="section-tag">angular interaction demo</p>
      <h2 class="section-title">Virtualized data-heavy UI.</h2>
      <p class="section-sub">
        This grid generates ten thousand mock enterprise records and renders them with a
        hand-rolled virtual scroller. It demonstrates the same Angular thinking needed for
        data-heavy product screens: constrained DOM size, stable row identity, and measured UI state.
      </p>

      <div class="demo-bar">
        <button class="btn btn-primary" (click)="generate()">
          ⟳ Regenerate {{ ROWS / 1000 }}k rows
        </button>
        @if (renderMs(); as ms) {
          <span class="metric">
            <span class="metric-num">{{ ms | number: '1.0-1' }}ms</span>
            to generate + render {{ ROWS | number }} mock rows
          </span>
        }
        <span class="metric dim">
          DOM rows right now: <span class="metric-num">{{ visibleRows().length }}</span>
        </span>
      </div>

      <div class="grid card">
        <div class="grid-head">
          <span>Ref</span><span>Account</span><span>Type</span>
          <span class="num">Amount</span><span>Status</span><span>Time</span>
        </div>
        <div
          class="grid-viewport"
          (scroll)="onScroll($event)"
          [style.height.px]="VIEWPORT_HEIGHT"
        >
          <div class="grid-spacer" [style.height.px]="totalHeight()">
            <div class="grid-window" [style.transform]="offsetTransform()">
              @for (t of visibleRows(); track t.id) {
                <div class="row">
                  <span class="mono">{{ t.ref }}</span>
                  <span>{{ t.account }}</span>
                  <span><span class="type type-{{ t.type }}">{{ t.type }}</span></span>
                  <span class="num mono">{{ t.amount | number: '1.2-2' }}</span>
                  <span><span class="status s-{{ t.status }}">{{ t.status }}</span></span>
                  <span class="dim">{{ t.time }}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <p class="foot">
        Techniques: virtual scrolling, OnPush change detection, Signals, and
        <code>track</code>-keyed rows for data-heavy Angular screens.
      </p>
    </section>
  `,
  styles: `
    .demo-bar {
      display: flex;
      align-items: center;
      gap: 22px;
      flex-wrap: wrap;
      margin-bottom: 18px;
    }
    .metric { color: var(--text-dim); font-size: 14.5px; }
    .metric.dim { color: var(--text-faint); }
    .metric-num {
      font-family: var(--mono);
      color: var(--ok);
      font-weight: 700;
      font-size: 16px;
    }
    .grid {
      padding: 0;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .grid:hover { transform: none; }
    .grid-head, .row {
      display: grid;
      grid-template-columns: 1.1fr 1.4fr 0.7fr 1fr 0.9fr 0.8fr;
      gap: 10px;
      align-items: center;
      padding: 0 18px;
      min-width: 720px;
    }
    .grid-head {
      height: 44px;
      font-size: 12.5px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-faint);
      border-bottom: 1px solid var(--line);
      background: var(--bg-raised);
    }
    .grid-viewport {
      min-width: 720px;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .grid-spacer { position: relative; }
    .grid-window { position: absolute; left: 0; right: 0; will-change: transform; }
    .row {
      height: 38px;
      font-size: 13.5px;
      border-bottom: 1px solid rgba(22, 48, 79, 0.45);
    }
    .row:hover { background: var(--accent-soft); }
    .mono { font-family: var(--mono); }
    .num { text-align: right; }
    .dim { color: var(--text-faint); }
    .type {
      font-size: 11.5px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 5px;
      background: var(--accent-soft);
      color: var(--accent);
    }
    .status { font-size: 12px; font-weight: 600; }
    .s-SETTLED { color: var(--ok); }
    .s-PENDING { color: var(--warn); }
    .s-REVIEW { color: var(--accent); }
    .foot { margin-top: 16px; color: var(--text-faint); font-size: 13.5px; }
    .foot code {
      font-family: var(--mono);
      color: var(--accent);
      background: var(--accent-soft);
      padding: 1px 6px;
      border-radius: 4px;
    }
    @media (max-width: 720px) {
      .grid {
        border-radius: 10px;
        -webkit-overflow-scrolling: touch;
      }
      .grid-head, .row, .grid-viewport { min-width: 680px; }
      .grid-head, .row {
        grid-template-columns: 1.05fr 1.25fr 0.7fr 1fr 0.85fr 0.65fr;
        padding-inline: 14px;
      }
      .grid-head {
        font-size: 11.5px;
        letter-spacing: 0.6px;
      }
      .row {
        font-size: 12.5px;
      }
      .type {
        padding-inline: 6px;
      }
      .status {
        font-size: 11.5px;
      }
    }
  `,
})
export class PerfDemo {
  readonly ROWS = 10_000;
  readonly VIEWPORT_HEIGHT = VIEWPORT_HEIGHT;

  private readonly data = signal<Txn[]>([]);
  private readonly scrollTop = signal(0);
  readonly renderMs = signal<number | null>(null);

  readonly totalHeight = computed(() => this.data().length * ROW_HEIGHT);

  readonly visibleRows = computed(() => {
    const start = Math.max(
      0,
      Math.floor(this.scrollTop() / ROW_HEIGHT) - OVERSCAN,
    );
    const count = Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + OVERSCAN * 2;
    return this.data().slice(start, start + count);
  });

  readonly offsetTransform = computed(() => {
    const start = Math.max(
      0,
      Math.floor(this.scrollTop() / ROW_HEIGHT) - OVERSCAN,
    );
    return `translateY(${start * ROW_HEIGHT}px)`;
  });

  constructor() {
    this.generate();
  }

  generate(): void {
    const t0 = performance.now();
    const types: Txn['type'][] = ['NEFT', 'RTGS', 'IMPS', 'UPI'];
    const statuses: Txn['status'][] = ['SETTLED', 'PENDING', 'REVIEW'];
    const accountGroups = ['PAY', 'TRK', 'TRS', 'CON', 'OPS', 'LED'];
    const rows: Txn[] = new Array(this.ROWS);

    for (let i = 0; i < this.ROWS; i++) {
      const accountGroup = accountGroups[(Math.random() * accountGroups.length) | 0];
      rows[i] = {
        id: i,
        ref: `TXN${String(100000000 + ((Math.random() * 899999999) | 0))}`,
        account: `${accountGroup}-${String(1000 + ((Math.random() * 9000) | 0))}`,
        type: types[(Math.random() * types.length) | 0],
        amount: Math.round(Math.random() * 25_00_000 * 100) / 100,
        status: statuses[(Math.random() * statuses.length) | 0],
        time: `${String((Math.random() * 24) | 0).padStart(2, '0')}:${String((Math.random() * 60) | 0).padStart(2, '0')}`,
      };
    }

    this.data.set(rows);
    requestAnimationFrame(() => this.renderMs.set(performance.now() - t0));
  }

  onScroll(event: Event): void {
    this.scrollTop.set((event.target as HTMLElement).scrollTop);
  }
}

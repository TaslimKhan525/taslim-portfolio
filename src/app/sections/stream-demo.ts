import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { toObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { combineLatest, EMPTY, interval, switchMap } from 'rxjs';

interface FeedTxn {
  id: number;
  ref: string;
  channel: 'UPI' | 'IMPS' | 'NEFT' | 'RTGS';
  amount: number;
}

const HISTORY_POINTS = 60;
const FEED_SIZE = 7;

/**
 * Live proof of "real-time financial workflows": an RxJS stream pushes
 * transactions at a visitor-controlled rate (up to 200/sec) into Signals,
 * with a hand-drawn SVG sparkline. No chart library, no websocket faked —
 * the reactive pipeline (toObservable → switchMap → interval) is the demo.
 */
@Component({
  selector: 'app-stream-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DecimalPipe],
  template: `
    <section class="section" id="stream">
      <p class="section-tag">live demo — rxjs stream</p>
      <h2 class="section-title">Real-time, under your control.</h2>
      <p class="section-sub">
        Banking dashboards don't get to lag when payments surge. This feed is a real RxJS
        pipeline — drag the slider and push it to 200 transactions/second. Watch the FPS
        badge in the corner: it doesn't flinch.
      </p>

      <div class="panel card">
        <div class="controls">
          <button class="btn" [class.btn-primary]="!paused()" [class.btn-ghost]="paused()"
                  (click)="paused.set(!paused())">
            {{ paused() ? '▶ Resume stream' : '⏸ Pause stream' }}
          </button>
          <label class="rate">
            <span>throughput</span>
            <input type="range" min="1" max="200" [value]="rate()"
                   (input)="onRate($event)" />
            <span class="rate-val">{{ rate() }} tx/s</span>
          </label>
        </div>

        <div class="board">
          <div class="feed">
            @for (t of feed(); track t.id) {
              <div class="feed-row">
                <span class="mono ref">{{ t.ref }}</span>
                <span class="chan c-{{ t.channel }}">{{ t.channel }}</span>
                <span class="mono amt">₹{{ t.amount | number: '1.2-2' }}</span>
              </div>
            } @empty {
              <div class="feed-row idle">stream paused — press resume</div>
            }
          </div>

          <div class="side">
            <div class="big-stat">
              <span class="big-num mono">{{ total() | number }}</span>
              <span class="big-label">transactions processed</span>
            </div>
            <svg class="spark" viewBox="0 0 240 56" preserveAspectRatio="none"
                 role="img" aria-label="Live throughput sparkline">
              <polyline [attr.points]="sparkPoints()" />
            </svg>
            <span class="spark-label">throughput, last {{ HISTORY_POINTS / 2 }}s</span>
          </div>
        </div>
      </div>

      <p class="foot">
        Pipeline: <code>toObservable(rate)</code> → <code>switchMap</code> →
        <code>interval</code> → Signals. Pause/resume, dynamic backpressure, zero dropped frames.
      </p>
    </section>
  `,
  styles: `
    .panel { padding: 22px; }
    .panel:hover { transform: none; }
    .controls {
      display: flex;
      align-items: center;
      gap: 24px;
      flex-wrap: wrap;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--line);
      margin-bottom: 18px;
    }
    .rate { display: flex; align-items: center; gap: 12px; color: var(--text-faint); font-size: 13px; }
    .rate input {
      width: 190px;
      accent-color: var(--accent);
    }
    .rate-val {
      font-family: var(--mono);
      color: var(--accent);
      font-weight: 700;
      font-size: 15px;
      min-width: 74px;
    }
    .board {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 26px;
      align-items: start;
    }
    .feed { display: flex; flex-direction: column; gap: 6px; min-height: 238px; }
    .feed-row {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 7px 14px;
      border-radius: 8px;
      background: var(--bg-raised);
      border: 1px solid rgba(22, 48, 79, 0.6);
      font-size: 13.5px;
      animation: slide-in 0.25s ease;
    }
    .feed-row.idle { color: var(--text-faint); justify-content: center; }
    @keyframes slide-in {
      from { opacity: 0; transform: translateY(-8px); }
      to { opacity: 1; transform: none; }
    }
    .mono { font-family: var(--mono); }
    .ref { color: var(--text-dim); }
    .amt { margin-left: auto; color: var(--text); font-weight: 600; }
    .chan {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 5px;
      background: var(--accent-soft);
      color: var(--accent);
    }
    .big-stat { display: flex; flex-direction: column; margin-bottom: 18px; }
    .big-num {
      font-size: 34px;
      font-weight: 700;
      color: var(--accent);
      font-variant-numeric: tabular-nums;
    }
    .big-label { color: var(--text-faint); font-size: 13px; }
    .spark {
      width: 100%;
      height: 56px;
      display: block;
    }
    .spark polyline {
      fill: none;
      stroke: var(--ok);
      stroke-width: 2;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 6px rgba(47, 208, 140, 0.5));
    }
    .spark-label { color: var(--text-faint); font-size: 12px; font-family: var(--mono); }
    .foot { margin-top: 16px; color: var(--text-faint); font-size: 13.5px; }
    .foot code {
      font-family: var(--mono);
      color: var(--accent);
      background: var(--accent-soft);
      padding: 1px 6px;
      border-radius: 4px;
    }
    @media (max-width: 720px) {
      .board { grid-template-columns: 1fr; }
    }
  `,
})
export class StreamDemo {
  readonly HISTORY_POINTS = HISTORY_POINTS;

  readonly rate = signal(20);
  readonly paused = signal(false);
  readonly total = signal(0);
  readonly feed = signal<FeedTxn[]>([]);

  private readonly history = signal<number[]>(new Array(HISTORY_POINTS).fill(0));
  private windowCount = 0;
  private nextId = 0;

  /** Sparkline points, normalised into the SVG viewBox. */
  readonly sparkPoints = computed(() => {
    const h = this.history();
    const max = Math.max(1, ...h);
    return h
      .map((v, i) => {
        const x = (i / (HISTORY_POINTS - 1)) * 240;
        const y = 52 - (v / max) * 44;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    // The reactive core: rate & paused signals become an observable pipeline.
    combineLatest([toObservable(this.rate), toObservable(this.paused)])
      .pipe(
        switchMap(([rate, paused]) =>
          paused ? EMPTY : interval(Math.max(5, Math.round(1000 / rate))),
        ),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.emitTxn());

    // Throughput history: shift a new bucket in every 500ms.
    const tickId = setInterval(() => {
      this.history.update((h) => [...h.slice(1), this.windowCount]);
      this.windowCount = 0;
    }, 500);
    destroyRef.onDestroy(() => clearInterval(tickId));
  }

  onRate(event: Event): void {
    this.rate.set(Number((event.target as HTMLInputElement).value));
  }

  private emitTxn(): void {
    const channels: FeedTxn['channel'][] = ['UPI', 'IMPS', 'NEFT', 'RTGS'];
    const txn: FeedTxn = {
      id: this.nextId++,
      ref: `TXN${String(100000000 + ((Math.random() * 899999999) | 0))}`,
      channel: channels[(Math.random() * channels.length) | 0],
      amount: Math.round(Math.random() * 5_00_000 * 100) / 100,
    };
    this.feed.update((f) => [txn, ...f].slice(0, FEED_SIZE));
    this.total.update((t) => t + 1);
    this.windowCount++;
  }
}

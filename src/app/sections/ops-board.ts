import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

interface Flight {
  id: number;
  flightNo: string;
  gate: string;
  aircraft: string;
  /** 0–100 across the whole turnaround */
  progress: number;
  /** progress points per tick — varies per flight */
  pace: number;
  /** flights whose pace can't finish before the SLA window get flagged */
  atRisk: boolean;
}

const TASKS = ['DEBOARD', 'CLEAN', 'FUEL', 'CATER', 'BOARD'] as const;
const TICK_MS = 300;

/**
 * Portfolio demo inspired by aviation operations workflows: task states,
 * progress visibility, and exception-oriented UI. It is simulated data.
 */
@Component({
  selector: 'app-ops-board',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="ops">
      <p class="section-tag">aviation workflow demo</p>
      <h2 class="section-title">Turnaround task visibility in Angular.</h2>
      <p class="section-sub">
        A compact simulation of the kind of operational screens I worked on at RSmart:
        task sequence, status changes, exception visibility, and data-driven UI updates
        for aviation turnaround workflows.
      </p>

      <div class="board-head">
        <span class="metric">
          <span class="metric-num">{{ completed() }}</span> turnarounds completed
        </span>
        <span class="metric">
          OTP <span class="metric-num" [class.warn]="otp() < 90">{{ otp() }}%</span>
        </span>
        <span class="metric dim">simulated workflow</span>
      </div>

      <div class="board card">
        <div class="row head">
          <span>Flight</span><span>Gate</span><span>Aircraft</span>
          <span class="stage-col">Turnaround progress</span><span>Status</span>
        </div>
        @for (f of flights(); track f.id) {
          <div class="row">
            <span class="mono flight-no">{{ f.flightNo }}</span>
            <span class="mono">{{ f.gate }}</span>
            <span class="dim">{{ f.aircraft }}</span>
            <span class="stage-col">
              <span class="stages">
                @for (t of TASKS; track t; let i = $index) {
                  <span
                    class="stage"
                    [class.done]="stageState(f, i) === 'done'"
                    [class.active]="stageState(f, i) === 'active'"
                  >{{ t }}</span>
                }
              </span>
              <span class="bar"><span class="fill" [style.width.%]="f.progress"></span></span>
            </span>
            <span
              class="status"
              [class.s-ok]="!f.atRisk"
              [class.s-risk]="f.atRisk && f.progress < 100"
            >
              {{ f.progress >= 100 ? 'PUSHBACK' : f.atRisk ? 'AT RISK' : 'ON TIME' }}
            </span>
          </div>
        }
      </div>

      <p class="foot">
        Related production work included Angular operational screens, DayPilot scheduling
        interfaces, REST API integration, RxJS, and production troubleshooting.
        <a href="https://www.rsmart.in/" target="_blank" rel="noopener">rsmart.in</a>
      </p>
    </section>
  `,
  styles: `
    .board-head {
      display: flex;
      gap: 28px;
      flex-wrap: wrap;
      margin-bottom: 16px;
    }
    .metric { color: var(--text-dim); font-size: 14.5px; }
    .metric.dim { color: var(--text-faint); }
    .metric-num {
      font-family: var(--mono);
      color: var(--ok);
      font-weight: 700;
      font-size: 16px;
    }
    .metric-num.warn { color: var(--warn); }
    .board { padding: 0 0 6px; overflow-x: auto; }
    .board:hover { transform: none; }
    .row {
      display: grid;
      grid-template-columns: 0.8fr 0.5fr 0.8fr 2.6fr 0.9fr;
      gap: 12px;
      align-items: center;
      padding: 12px 18px;
      border-bottom: 1px solid rgba(22, 48, 79, 0.45);
      min-width: 640px;
    }
    .row.head {
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text-faint);
      background: var(--bg-raised);
    }
    .mono { font-family: var(--mono); }
    .flight-no { color: var(--accent); font-weight: 700; }
    .dim { color: var(--text-faint); }
    .stage-col { display: flex; flex-direction: column; gap: 6px; }
    .stages { display: flex; gap: 6px; flex-wrap: wrap; }
    .stage {
      font-size: 10px;
      font-family: var(--mono);
      letter-spacing: 0.5px;
      padding: 2px 7px;
      border-radius: 4px;
      border: 1px solid var(--line);
      color: var(--text-faint);
      transition: all 0.3s ease;
    }
    .stage.done {
      border-color: var(--ok);
      color: var(--ok);
      opacity: 0.75;
    }
    .stage.active {
      border-color: var(--accent);
      color: var(--accent);
      background: var(--accent-soft);
      box-shadow: 0 0 10px var(--accent-glow);
    }
    .bar {
      height: 4px;
      border-radius: 99px;
      background: var(--bg);
      overflow: hidden;
    }
    .fill {
      display: block;
      height: 100%;
      border-radius: 99px;
      background: linear-gradient(90deg, var(--accent), var(--ok));
      transition: width 0.3s linear;
    }
    .status { font-size: 12px; font-weight: 700; font-family: var(--mono); }
    .s-ok { color: var(--ok); }
    .s-risk { color: var(--warn); }
    .foot { margin-top: 16px; color: var(--text-faint); font-size: 13.5px; }
    .foot code {
      font-family: var(--mono);
      color: var(--accent);
      background: var(--accent-soft);
      padding: 1px 6px;
      border-radius: 4px;
    }
    .foot a { color: var(--accent); text-decoration: none; }
    .foot a:hover { text-decoration: underline; }
  `,
})
export class OpsBoard {
  readonly TASKS = TASKS;

  readonly flights = signal<Flight[]>([]);
  readonly completed = signal(0);
  private late = 0;
  private nextId = 0;

  readonly otp = computed(() => {
    const done = this.completed();
    if (done === 0) return 100;
    return Math.round(((done - this.late) / done) * 100);
  });

  constructor() {
    const destroyRef = inject(DestroyRef);
    this.flights.set(Array.from({ length: 5 }, () => this.spawn()));

    const tickId = setInterval(() => {
      this.flights.update((list) =>
        list.map((f) => {
          if (f.progress >= 100) {
            // Departed — count it, roll a fresh arrival onto the stand.
            this.completed.update((c) => c + 1);
            if (f.atRisk) this.late++;
            return this.spawn();
          }
          return { ...f, progress: Math.min(100, f.progress + f.pace) };
        }),
      );
    }, TICK_MS);
    destroyRef.onDestroy(() => clearInterval(tickId));
  }

  stageState(f: Flight, index: number): 'done' | 'active' | 'todo' {
    const per = 100 / TASKS.length;
    if (f.progress >= (index + 1) * per) return 'done';
    if (f.progress >= index * per) return 'active';
    return 'todo';
  }

  private spawn(): Flight {
    const flightPrefixes = ['FL', 'GT', 'TR', 'RW', 'SK', 'VX'];
    const aircraft = ['A320neo', 'B737-800', 'A321', 'ATR 72', 'B777-300ER'];
    const pace = 0.7 + Math.random() * 1.6;
    return {
      id: this.nextId++,
      flightNo: `${flightPrefixes[(Math.random() * flightPrefixes.length) | 0]}${100 + ((Math.random() * 899) | 0)}`,
      gate: `${'ABCD'[(Math.random() * 4) | 0]}${1 + ((Math.random() * 24) | 0)}`,
      aircraft: aircraft[(Math.random() * aircraft.length) | 0],
      progress: 0,
      pace,
      atRisk: pace < 1.0, // slow turnarounds can't make the SLA window
    };
  }
}

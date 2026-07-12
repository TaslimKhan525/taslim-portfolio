import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

interface Command {
  label: string;
  hint: string;
  target: string;
}

/** Ctrl+K command palette for keyboard-first section navigation. */
@Component({
  selector: 'app-command-palette',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown)': 'onKeydown($event)',
  },
  template: `
    @if (open()) {
      <div class="overlay" (click)="close()">
        <div class="palette" (click)="$event.stopPropagation()">
          <input
            #box
            type="text"
            placeholder="Where to? Try 'work'..."
            [value]="query()"
            (input)="query.set(box.value); active.set(0)"
            autofocus
          />
          <ul>
            @for (c of filtered(); track c.target; let i = $index) {
              <li
                [class.active]="i === active()"
                (mouseenter)="active.set(i)"
                (click)="go(c)"
              >
                <span>{{ c.label }}</span>
                <span class="hint">{{ c.hint }}</span>
              </li>
            } @empty {
              <li class="empty">No match - try "work", "skills", "contact".</li>
            }
          </ul>
          <footer>arrow keys navigate / enter opens / esc closes</footer>
        </div>
      </div>
    }
  `,
  styles: `
    .overlay {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(4, 9, 17, 0.7);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: center;
      padding-top: 18vh;
    }
    .palette {
      width: min(520px, 92vw);
      height: fit-content;
      background: var(--bg-raised);
      border: 1px solid var(--accent);
      border-radius: 14px;
      box-shadow: 0 24px 80px -20px var(--accent-glow);
      overflow: hidden;
    }
    input {
      width: 100%;
      padding: 16px 20px;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text);
      font-size: 16px;
      font-family: var(--font);
      border-bottom: 1px solid var(--line);
    }
    ul { list-style: none; margin: 0; padding: 8px; max-height: 300px; overflow-y: auto; }
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 14px;
      border-radius: 8px;
      cursor: pointer;
      color: var(--text-dim);
      font-size: 15px;
    }
    li.active { background: var(--accent-soft); color: var(--text); }
    li.empty { cursor: default; color: var(--text-faint); font-size: 14px; }
    .hint { font-family: var(--mono); font-size: 12px; color: var(--text-faint); }
    footer {
      padding: 10px 18px;
      border-top: 1px solid var(--line);
      font-family: var(--mono);
      font-size: 12px;
      color: var(--text-faint);
    }
  `,
})
export class CommandPalette {
  readonly open = signal(false);
  readonly query = signal('');
  readonly active = signal(0);

  private readonly commands: Command[] = [
    { label: 'Recruiter fit snapshot', hint: 'role fit', target: '#snapshot' },
    { label: 'Selected product engineering work', hint: 'fintech / aviation', target: '#work' },
    { label: 'Skills hierarchy', hint: 'angular / rxjs', target: '#skills' },
    { label: 'Maker-checker workflow lab', hint: 'role actions', target: '#workflow-lab' },
    { label: 'Virtualized data UI demo', hint: '10k mock rows', target: '#demo' },
    { label: 'RxJS interaction demo', hint: 'simulated stream', target: '#stream' },
    { label: 'Aviation workflow demo', hint: 'turnaround UI', target: '#ops' },
    { label: 'Writing', hint: 'linkedin posts', target: '#writing' },
    { label: 'Contact', hint: 'email / linkedin', target: '#contact' },
    { label: 'Back to top', hint: 'hero', target: '#top' },
  ];

  readonly filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.commands;
    return this.commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    );
  });

  onKeydown(event: KeyboardEvent): void {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.open.update((v) => !v);
      this.query.set('');
      this.active.set(0);
      return;
    }
    if (!this.open()) return;

    switch (event.key) {
      case 'Escape':
        this.close();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.active.update((i) => Math.min(i + 1, this.filtered().length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.active.update((i) => Math.max(i - 1, 0));
        break;
      case 'Enter': {
        const cmd = this.filtered()[this.active()];
        if (cmd) this.go(cmd);
        break;
      }
    }
  }

  go(cmd: Command): void {
    document.querySelector(cmd.target)?.scrollIntoView({ behavior: 'smooth' });
    this.close();
  }

  close(): void {
    this.open.set(false);
  }
}

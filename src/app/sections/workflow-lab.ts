import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

type Role = 'Maker' | 'Checker' | 'Verifier';
type WorkflowStatus = 'Draft' | 'Pending Checker' | 'Pending Verifier' | 'Approved' | 'Needs Info';
type DocumentStatus = 'Required' | 'Uploaded' | 'Deferred';

interface WorkflowDocument {
  name: string;
  status: DocumentStatus;
}

interface Activity {
  actor: string;
  action: string;
}

@Component({
  selector: 'app-workflow-lab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="workflow-lab">
      <p class="section-tag">interactive workflow lab</p>
      <h2 class="section-title">Maker-checker-verifier UI logic, visible.</h2>
      <p class="section-sub">
        A compact Angular demo of the enterprise workflow patterns behind my financial
        product work: role-based actions, required documents, deferral tracking, validation
        state, and status-driven UI.
      </p>

      <div class="lab card">
        <div class="lab-head">
          <div>
            <span class="eyebrow">Deal instruction</span>
            <h3>Workflow console</h3>
          </div>
          <span class="status">{{ status() }}</span>
        </div>

        <div class="role-row" aria-label="Role selection">
          @for (role of roles; track role) {
            <button
              type="button"
              class="role-btn"
              [class.active]="selectedRole() === role"
              (click)="selectedRole.set(role)"
            >
              {{ role }}
            </button>
          }
        </div>

        <div class="lab-grid">
          <section class="panel">
            <h4>Required documents</h4>
            <div class="doc-list">
              @for (doc of documents(); track doc.name) {
                <button type="button" class="doc" (click)="cycleDocument(doc.name)">
                  <span>{{ doc.name }}</span>
                  <span class="doc-status s-{{ doc.status }}">{{ doc.status }}</span>
                </button>
              }
            </div>
          </section>

          <section class="panel">
            <h4>Validation state</h4>
            <ul class="checks">
              @for (check of validationChecks(); track check.label) {
                <li [class.pass]="check.pass">
                  <span class="check-dot"></span>
                  {{ check.label }}
                </li>
              }
            </ul>
          </section>

          <section class="panel actions">
            <h4>Available actions</h4>
            <div class="action-grid">
              @for (action of actions(); track action.label) {
                <button
                  type="button"
                  class="action"
                  [disabled]="action.disabled"
                  (click)="runAction(action.label)"
                >
                  <span>{{ action.label }}</span>
                  <small>{{ action.reason }}</small>
                </button>
              }
            </div>
          </section>

          <section class="panel">
            <h4>Audit trail</h4>
            <ol class="timeline">
              @for (item of activity(); track item.action + item.actor) {
                <li>
                  <strong>{{ item.actor }}</strong>
                  <span>{{ item.action }}</span>
                </li>
              }
            </ol>
          </section>
        </div>
      </div>

      <p class="foot">
        Built with Angular Signals and computed state. The data is simulated; the interaction
        pattern reflects real enterprise UI concerns: allowed actions, validation gates,
        checklist state, and review handoffs.
      </p>
    </section>
  `,
  styles: `
    .lab {
      padding: 0;
      overflow: hidden;
    }
    .lab:hover {
      transform: none;
    }
    .lab-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      padding: 22px 24px;
      border-bottom: 1px solid var(--line);
      background: var(--bg-raised);
    }
    .eyebrow {
      display: block;
      margin-bottom: 4px;
      color: var(--text-faint);
      font-family: var(--mono);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    h3 {
      margin: 0;
      font-size: 24px;
      color: var(--text);
    }
    .status {
      padding: 7px 12px;
      border: 1px solid rgba(43, 164, 234, 0.55);
      border-radius: 8px;
      background: var(--accent-soft);
      color: var(--accent);
      font-family: var(--mono);
      font-size: 13px;
      white-space: nowrap;
    }
    .role-row {
      display: flex;
      gap: 10px;
      padding: 18px 24px;
      border-bottom: 1px solid var(--line);
      overflow-x: auto;
    }
    .role-btn,
    .action,
    .doc {
      font: inherit;
      border: 1px solid var(--line);
      background: var(--bg);
      color: var(--text-dim);
      cursor: pointer;
      transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    }
    .role-btn {
      min-width: 110px;
      padding: 9px 12px;
      border-radius: 8px;
      font-family: var(--mono);
      font-size: 13px;
    }
    .role-btn.active {
      border-color: var(--accent);
      color: var(--accent);
      background: var(--accent-soft);
    }
    .lab-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 1px;
      background: var(--line);
    }
    .panel {
      min-height: 230px;
      padding: 22px;
      background: linear-gradient(160deg, var(--bg-card), var(--bg-raised));
    }
    h4 {
      margin: 0 0 14px;
      color: var(--accent);
      font-family: var(--mono);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .doc-list,
    .action-grid {
      display: grid;
      gap: 10px;
    }
    .doc {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      width: 100%;
      padding: 11px 12px;
      border-radius: 8px;
      text-align: left;
    }
    .doc:hover,
    .action:hover:not(:disabled) {
      border-color: var(--accent);
      color: var(--text);
    }
    .doc-status {
      flex: 0 0 auto;
      font-family: var(--mono);
      font-size: 11px;
    }
    .s-Uploaded { color: var(--ok); }
    .s-Deferred { color: var(--warn); }
    .s-Required { color: var(--text-faint); }
    .checks {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 12px;
      color: var(--text-dim);
      font-size: 14px;
    }
    .checks li {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .check-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--warn);
      box-shadow: 0 0 0 4px rgba(240, 180, 41, 0.12);
    }
    .checks li.pass .check-dot {
      background: var(--ok);
      box-shadow: 0 0 0 4px rgba(47, 208, 140, 0.12);
    }
    .action {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-height: 64px;
      padding: 11px 12px;
      border-radius: 8px;
      text-align: left;
    }
    .action span {
      color: var(--text);
      font-weight: 600;
    }
    .action small {
      color: var(--text-faint);
      font-size: 12px;
    }
    .action:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }
    .timeline {
      margin: 0;
      padding-left: 18px;
      color: var(--text-dim);
      display: grid;
      gap: 10px;
      font-size: 14px;
    }
    .timeline li::marker {
      color: var(--accent);
    }
    .timeline strong {
      display: block;
      color: var(--text);
      font-size: 13px;
    }
    .timeline span {
      color: var(--text-faint);
    }
    .foot {
      margin: 16px 0 0;
      color: var(--text-faint);
      font-size: 13.5px;
    }
    @media (max-width: 820px) {
      .lab-grid { grid-template-columns: 1fr; }
      .lab-head {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `,
})
export class WorkflowLab {
  readonly roles: Role[] = ['Maker', 'Checker', 'Verifier'];
  readonly selectedRole = signal<Role>('Maker');
  readonly status = signal<WorkflowStatus>('Draft');
  readonly documents = signal<WorkflowDocument[]>([
    { name: 'Instruction summary', status: 'Uploaded' },
    { name: 'Approval checklist', status: 'Required' },
    { name: 'Supporting document', status: 'Deferred' },
    { name: 'Review remarks', status: 'Required' },
  ]);
  readonly activity = signal<Activity[]>([
    { actor: 'System', action: 'Draft workflow loaded with required document checks.' },
  ]);

  readonly validationChecks = computed(() => {
    const docs = this.documents();
    const requiredClosed = docs.every((doc) => doc.status !== 'Required');
    const hasUploaded = docs.some((doc) => doc.status === 'Uploaded');
    const roleCanAct = this.canCurrentRoleAct();
    return [
      { label: 'No required documents are missing', pass: requiredClosed },
      { label: 'At least one supporting item is uploaded', pass: hasUploaded },
      { label: 'Selected role has an action for this state', pass: roleCanAct },
      { label: 'Workflow is not already approved', pass: this.status() !== 'Approved' },
    ];
  });

  readonly actions = computed(() => {
    const role = this.selectedRole();
    const status = this.status();
    const ready = this.documents().every((doc) => doc.status !== 'Required');

    return [
      {
        label: 'Submit',
        disabled: !(role === 'Maker' && ['Draft', 'Needs Info'].includes(status) && ready),
        reason: 'Maker sends ready work to checker',
      },
      {
        label: 'Request Info',
        disabled: !(role === 'Checker' && status === 'Pending Checker'),
        reason: 'Checker returns workflow to maker',
      },
      {
        label: 'Checker Approve',
        disabled: !(role === 'Checker' && status === 'Pending Checker' && ready),
        reason: 'Checker forwards to verifier',
      },
      {
        label: 'Verifier Approve',
        disabled: !(role === 'Verifier' && status === 'Pending Verifier' && ready),
        reason: 'Verifier completes workflow',
      },
      {
        label: 'Reset Demo',
        disabled: false,
        reason: 'Return to draft state',
      },
    ];
  });

  cycleDocument(name: string): void {
    const order: DocumentStatus[] = ['Required', 'Uploaded', 'Deferred'];
    this.documents.update((docs) =>
      docs.map((doc) => {
        if (doc.name !== name) return doc;
        const next = order[(order.indexOf(doc.status) + 1) % order.length];
        return { ...doc, status: next };
      }),
    );
  }

  runAction(label: string): void {
    switch (label) {
      case 'Submit':
        this.transition('Pending Checker', 'Submitted workflow for checker review.');
        this.selectedRole.set('Checker');
        break;
      case 'Request Info':
        this.transition('Needs Info', 'Requested additional information from maker.');
        this.selectedRole.set('Maker');
        break;
      case 'Checker Approve':
        this.transition('Pending Verifier', 'Checker approved and forwarded for verification.');
        this.selectedRole.set('Verifier');
        break;
      case 'Verifier Approve':
        this.transition('Approved', 'Verifier approved the workflow.');
        break;
      case 'Reset Demo':
        this.reset();
        break;
    }
  }

  private transition(nextStatus: WorkflowStatus, action: string): void {
    this.status.set(nextStatus);
    this.activity.update((items) => [{ actor: this.selectedRole(), action }, ...items].slice(0, 5));
  }

  private reset(): void {
    this.status.set('Draft');
    this.selectedRole.set('Maker');
    this.documents.set([
      { name: 'Instruction summary', status: 'Uploaded' },
      { name: 'Approval checklist', status: 'Required' },
      { name: 'Supporting document', status: 'Deferred' },
      { name: 'Review remarks', status: 'Required' },
    ]);
    this.activity.set([{ actor: 'System', action: 'Draft workflow loaded with required document checks.' }]);
  }

  private canCurrentRoleAct(): boolean {
    const role = this.selectedRole();
    const status = this.status();
    return (
      (role === 'Maker' && ['Draft', 'Needs Info'].includes(status)) ||
      (role === 'Checker' && status === 'Pending Checker') ||
      (role === 'Verifier' && status === 'Pending Verifier')
    );
  }
}

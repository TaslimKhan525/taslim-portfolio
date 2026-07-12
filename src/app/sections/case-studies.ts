import { ChangeDetectionStrategy, Component } from '@angular/core';

interface CaseStudy {
  title: string;
  org: string;
  domain: string;
  summary: string;
  challenge: string;
  contribution: string[];
  frontendComplexity: string[];
  crossStack?: string;
  stack: string[];
}

@Component({
  selector: 'app-case-studies',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="work">
      <p class="section-tag">selected product engineering work</p>
      <h2 class="section-title">Enterprise Angular work beyond basic CRUD screens.</h2>
      <p class="section-sub">
        A focused view of the workflow-heavy product areas I worked on across financial
        technology and aviation operations. The wording stays intentionally specific without
        exposing client names, internal rules, or unsupported metrics.
      </p>

      <div class="cases">
        @for (c of cases; track c.title) {
          <article class="card case">
            <div class="case-top">
              <div>
                <p class="domain">{{ c.domain }}</p>
                <h3>{{ c.title }}</h3>
                <p class="meta">{{ c.org }}</p>
              </div>
            </div>

            <p class="summary">{{ c.summary }}</p>

            <details>
              <summary>Engineering detail</summary>
              <div class="detail-grid">
                <section>
                  <h4>Challenge</h4>
                  <p>{{ c.challenge }}</p>
                </section>

                <section>
                  <h4>My contribution</h4>
                  <ul>
                    @for (item of c.contribution; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </section>

                <section>
                  <h4>Angular complexity</h4>
                  <ul>
                    @for (item of c.frontendComplexity; track item) {
                      <li>{{ item }}</li>
                    }
                  </ul>
                </section>

                @if (c.crossStack) {
                  <section>
                    <h4>Cross-stack exposure</h4>
                    <p>{{ c.crossStack }}</p>
                  </section>
                }
              </div>
            </details>

            <div class="stack" aria-label="Technologies used">
              @for (s of c.stack; track s) {
                <span class="chip">{{ s }}</span>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .cases {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
    }
    .case {
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .case-top {
      display: flex;
      justify-content: space-between;
      gap: 18px;
    }
    .domain {
      margin: 0 0 6px;
      font-family: var(--mono);
      font-size: 12.5px;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: var(--accent);
    }
    .case h3 {
      margin: 0 0 4px;
      font-size: 21px;
      line-height: 1.25;
      color: var(--text);
    }
    .meta {
      margin: 0;
      font-size: 13.5px;
      color: var(--text-faint);
      font-family: var(--mono);
    }
    .summary {
      color: var(--text-dim);
      margin: 0;
    }
    details {
      border-top: 1px solid var(--line);
      border-bottom: 1px solid var(--line);
      padding: 12px 0;
    }
    summary {
      cursor: pointer;
      color: var(--accent);
      font-family: var(--mono);
      font-size: 13px;
      list-style-position: outside;
    }
    .detail-grid {
      display: grid;
      gap: 16px;
      padding-top: 16px;
    }
    h4 {
      margin: 0 0 6px;
      font-size: 13px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--text);
      font-family: var(--mono);
    }
    .detail-grid p,
    .detail-grid ul {
      margin: 0;
      color: var(--text-dim);
      font-size: 14px;
    }
    .detail-grid ul {
      padding-left: 18px;
    }
    .detail-grid li {
      margin-bottom: 6px;
    }
    .detail-grid li::marker {
      color: var(--accent);
    }
    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: auto;
    }
    @media (max-width: 860px) {
      .cases { grid-template-columns: 1fr; }
    }
  `,
})
export class CaseStudies {
  readonly cases: CaseStudy[] = [
    {
      title: 'Deal Lifecycle Maker-Checker Workflow',
      org: 'DataNimbus / finhub.ai Trust',
      domain: 'Financial technology',
      summary:
        'Angular workflow screens for deal lifecycle handling, maker-checker actions, document-oriented status work, and state-dependent enterprise UI.',
      challenge:
        'The UI needed to support dense deal information, clear workflow state, validations, and different user actions without exposing confidential business rules.',
      contribution: [
        'Built and maintained Angular screens for maker and checker workflow steps.',
        'Handled state-dependent actions, required document lists, deferral document tracking, and table filtering workflows.',
        'Integrated REST APIs and asynchronous UI states using RxJS patterns.',
        'Created reusable components for repeated enterprise workflow views.',
      ],
      frontendComplexity: [
        'Complex forms and validations.',
        'Workflow state handling across list, detail, and action screens.',
        'Data-heavy tables, filters, and conditional actions.',
        'Reusable Angular components for consistent workflow behavior.',
      ],
      crossStack:
        'Contributed to related backend/API tasks when required, while keeping Angular as the primary ownership area.',
      stack: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'ag-Grid', 'Complex Forms'],
    },
    {
      title: 'Transaction Lifecycle Maker-Checker-Verifier Workflow',
      org: 'DataNimbus / finhub.ai',
      domain: 'Financial technology',
      summary:
        'Role and state-driven transaction workflow interfaces covering maker, checker, and verifier actions, pending transaction views, and instruction summaries.',
      challenge:
        'Transaction screens needed to make status, allowed actions, validation results, and review context obvious without leaking client-specific transaction rules.',
      contribution: [
        'Implemented Angular screens for transaction lifecycle states and role-based workflow actions.',
        'Worked on pending transaction and transaction instruction summary interfaces.',
        'Connected UI state to REST APIs with RxJS-driven asynchronous handling.',
        'Supported reusable table, filter, and validation patterns across workflow screens.',
      ],
      frontendComplexity: [
        'State-dependent UI behavior for maker, checker, and verifier paths.',
        'Validation-heavy forms and action flows.',
        'Data-heavy transaction views with filtering and status presentation.',
        'ag-Grid usage where tabular workflow data required richer interaction.',
      ],
      crossStack:
        'Made supporting Node.js and MongoDB-related changes when product work required it.',
      stack: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'ag-Grid', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Resource Planning & Dynamic Scheduling with DayPilot',
      org: 'RSmart Aviation Software / ResoSmart',
      domain: 'Aviation operations',
      summary:
        'Scheduling and resource management interfaces for workforce/resource allocation, timeline-based views, scheduler events, and API-backed planning data.',
      challenge:
        'Scheduling screens had to present dense operational data while keeping task/resource assignment and calendar state understandable for users.',
      contribution: [
        'Worked on Angular scheduling interfaces using DayPilot Scheduler.',
        'Handled interactive scheduler events, resource/task updates, and UI state changes.',
        'Integrated scheduling data from APIs into timeline-oriented Angular views.',
        'Contributed to component communication and structural changes around scheduling workflows.',
      ],
      frontendComplexity: [
        'Timeline-based scheduler UI.',
        'Complex calendar state and resource allocation views.',
        'API-integrated scheduling data and update flows.',
        'Reusable Angular patterns for workflow-heavy scheduling screens.',
      ],
      crossStack:
        'Made small C#/.NET MVC and backend changes when required to support product features.',
      stack: ['Angular 8-17', 'TypeScript', 'RxJS', 'DayPilot Scheduler', 'REST APIs', 'C#', '.NET MVC'],
    },
    {
      title: 'Aircraft Turnaround Operations Workflow',
      org: 'RSmart Aviation Software / RsmarTurn',
      domain: 'Aviation operations',
      summary:
        'Angular operational screens for turnaround tasks, activity/status visibility, exception presentation, and time-sensitive workflow monitoring.',
      challenge:
        'Turnaround workflows required clear task sequence, operational state, and exception visibility in screens used for active airport ground operations.',
      contribution: [
        'Worked on Angular screens for turnaround activity and task workflows.',
        'Presented status changes, delay/exception context, and operational state in API-driven UI.',
        'Contributed to reusable components for complex aviation workflow screens.',
        'Helped troubleshoot production issues affecting application responsiveness.',
      ],
      frontendComplexity: [
        'Status-driven operational UI.',
        'Task sequence and exception visibility.',
        'Data-heavy screens for operational monitoring.',
        'Angular component structure for workflow reuse.',
      ],
      crossStack:
        'Supported Windows Server deployment, production troubleshooting, and application/server performance investigation.',
      stack: ['Angular 8-17', 'TypeScript', 'RxJS', 'REST APIs', 'Windows Server', 'Production Troubleshooting'],
    },
    {
      title: 'Financial Operations Interfaces across Pay / Track / Trust / Connect',
      org: 'DataNimbus / finhub.ai',
      domain: 'Financial technology',
      summary:
        'Enterprise Angular interfaces for payment-oriented workflows, transaction/fund visibility, validation and exception screens, and data-heavy monitoring UI.',
      challenge:
        'Financial operations screens needed reliable data presentation, filters, status visibility, and error/asynchronous handling across related product areas.',
      contribution: [
        'Built and maintained API-integrated Angular workflow screens across finhub.ai product areas.',
        'Worked on transaction state visibility, filtering, search, and status presentation.',
        'Handled validation-heavy UI and reusable components for enterprise workflows.',
        'Supported application troubleshooting across frontend and deployment contexts.',
      ],
      frontendComplexity: [
        'Data-heavy Angular views and dashboards.',
        'Reusable table/filter components.',
        'RxJS data flows and asynchronous states.',
        'Role and state-aware actions where workflows required them.',
      ],
      crossStack:
        'Contributed to React, Node.js, MongoDB, Jenkins CI/CD, and Kubernetes troubleshooting tasks when required, without positioning those as primary expertise.',
      stack: ['Angular', 'TypeScript', 'RxJS', 'REST APIs', 'ag-Grid', 'React', 'Jenkins', 'Kubernetes Exposure'],
    },
    {
      title: 'Contract & Revenue Workflow Interfaces',
      org: 'RSmart Aviation Software / Revenue$mart',
      domain: 'Aviation finance operations',
      summary:
        'Angular enterprise screens for contract-driven workflows, budget amendments, rate/SLA-related interfaces, complex forms, and API-backed revenue operations UI.',
      challenge:
        'Contract and revenue workflows required validation-heavy forms, amendment flows, tabular business data, and clear UI states for operational users.',
      contribution: [
        'Worked on budget amendment-related enterprise screens.',
        'Built and maintained contract, rate, SLA, and revenue workflow UI where required.',
        'Integrated REST APIs and supported reusable Angular components for data-heavy business screens.',
        'Made small supporting C#/.NET MVC changes when frontend/product delivery required it.',
      ],
      frontendComplexity: [
        'Complex forms and validation paths.',
        'Contract/rate-sheet data presentation.',
        'Workflow state and amendment handling.',
        'Reusable components for enterprise business screens.',
      ],
      crossStack:
        'Supported Windows Server deployment, production troubleshooting, and performance investigation in the application environment.',
      stack: ['Angular 8-17', 'TypeScript', 'RxJS', 'REST APIs', 'C#', '.NET MVC', 'Windows Server'],
    },
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SkillGroup {
  name: string;
  level: 'Primary' | 'Hands-on' | 'Working exposure';
  note: string;
  items: string[];
}

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section" id="skills">
      <p class="section-tag">skills hierarchy</p>
      <h2 class="section-title">Angular first, with enterprise delivery depth.</h2>
      <p class="section-sub">
        Recruiters scan for keywords, but interviewers look for depth. This section keeps
        Angular visibly primary while still showing the broader product engineering range.
      </p>

      <div class="priority-strip">
        @for (item of prioritySkills; track item) {
          <span>{{ item }}</span>
        }
      </div>

      <div class="groups">
        @for (g of groups; track g.name) {
          <div class="card group" [class.primary]="g.level === 'Primary'">
            <div class="group-head">
              <h3>{{ g.name }}</h3>
              <span>{{ g.level }}</span>
            </div>
            <p>{{ g.note }}</p>
            <div class="chips">
              @for (s of g.items; track s) {
                <span class="chip">{{ s }}</span>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .priority-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 22px;
    }
    .priority-strip span {
      padding: 12px 14px;
      border: 1px solid rgba(43, 164, 234, 0.55);
      border-radius: 8px;
      background: var(--accent-soft);
      color: var(--text);
      font-family: var(--mono);
      font-size: 13px;
      text-align: center;
    }
    .groups {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
    .group {
      padding: 22px;
    }
    .group.primary {
      grid-column: 1 / -1;
      border-color: rgba(43, 164, 234, 0.65);
      background:
        linear-gradient(160deg, rgba(43, 164, 234, 0.14), transparent 44%),
        linear-gradient(160deg, var(--bg-card), var(--bg-raised));
    }
    .group-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      margin-bottom: 10px;
    }
    .group h3 {
      margin: 0;
      font-size: 15px;
      letter-spacing: 1.4px;
      text-transform: uppercase;
      color: var(--accent);
      font-family: var(--mono);
    }
    .group-head span {
      flex: 0 0 auto;
      padding: 4px 8px;
      border: 1px solid var(--line);
      border-radius: 6px;
      color: var(--text-faint);
      font-family: var(--mono);
      font-size: 11px;
    }
    .group.primary .group-head span {
      border-color: rgba(43, 164, 234, 0.65);
      color: var(--accent);
    }
    .group p {
      margin: 0 0 15px;
      color: var(--text-faint);
      font-size: 14px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .group.primary .chip {
      color: var(--text);
      border-color: rgba(43, 164, 234, 0.55);
    }
    @media (max-width: 900px) {
      .priority-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .groups { grid-template-columns: 1fr; }
      .group.primary { grid-column: auto; }
    }
    @media (max-width: 480px) {
      .priority-strip { grid-template-columns: 1fr; }
    }
  `,
})
export class Skills {
  readonly prioritySkills = [
    'Angular 8-17',
    'TypeScript + RxJS',
    'Enterprise Workflows',
    'Production Troubleshooting',
  ];

  readonly groups: SkillGroup[] = [
    {
      name: 'Frontend core',
      level: 'Primary',
      note: 'The strongest and most marketable part of the profile.',
      items: [
        'Angular v8-17',
        'TypeScript',
        'JavaScript / ES6+',
        'HTML5',
        'CSS3',
        'SCSS / SASS',
        'Responsive Web Design',
        'Angular CLI',
        'Angular Material',
        'PrimeNG',
        'Bootstrap',
        'Tailwind CSS',
        'Reactive Forms',
        'Template-driven Forms',
        'Component-based Architecture',
        'Reusable UI Components',
        'Dynamic UI Components',
        'Shared Components',
        'Lazy Loading',
        'Routing',
        'Route Guards',
        'Dependency Injection',
        'Angular Lifecycle Hooks',
        'Change Detection',
        'HTTP Interceptors',
        'Angular HttpClient',
        'Custom Pipes',
        'Directives',
        'Services',
        'State Management Concepts',
      ],
    },
    {
      name: 'RxJS / reactive programming',
      level: 'Primary',
      note: 'Used for asynchronous API handling, UI state, streams, and subscription management.',
      items: [
        'RxJS',
        'Reactive Programming',
        'Observables',
        'Observer',
        'Subscription',
        'Subject',
        'BehaviorSubject',
        'ReplaySubject',
        'AsyncSubject',
        'Cold Observables',
        'Hot Observables',
        'RxJS Operators',
        'Observable-based API Handling',
        'Subscription Management',
      ],
    },
    {
      name: 'Frontend architecture',
      level: 'Hands-on',
      note: 'Architecture and refactoring work around large Angular product screens.',
      items: [
        'Modular Frontend Architecture',
        'Scalable Frontend Architecture',
        'Component Architecture',
        'UI Design Patterns',
        'Enterprise Application Architecture',
        'Reusable Component Design',
        'Shared Module Design',
        'Code Optimization',
        'Performance Optimization',
        'Legacy Application Modernization',
        'Architectural Changes / Refactoring',
        'Micro Frontend Architecture Exposure',
      ],
    },
    {
      name: 'Backend and API collaboration',
      level: 'Working exposure',
      note: 'Frontend-heavy full-stack exposure and backend collaboration, not backend ownership positioning.',
      items: [
        'Node.js',
        'Express.js',
        'RESTful APIs',
        'REST API Integration',
        'API Integration',
        'JSON',
        'OpenAPI / Swagger',
        'C# Basics / Working Exposure',
        'ASP.NET MVC Framework Exposure',
        'ASP.NET Core / .NET API Consumption',
        'Backend Changes / API Integration Support',
      ],
    },
    {
      name: 'Database and enterprise UI libraries',
      level: 'Hands-on',
      note: 'Tools used around data-heavy Angular screens and enterprise workflows.',
      items: [
        'MongoDB',
        'MongoDB Compass',
        'AG Grid',
        'Angular Material',
        'PrimeNG',
        'Bootstrap',
        'Tailwind CSS',
        'Figma',
        'Responsive UI Development',
        'Data Tables',
        'Dynamic Forms',
        'Complex Enterprise Screens',
        'Filter Dialogs',
        'Column Preferences / User Preferences',
        'Maker-Checker Workflows',
      ],
    },
    {
      name: 'DevOps and deployment',
      level: 'Working exposure',
      note: 'Delivery support, deployments, environment work, and troubleshooting exposure.',
      items: [
        'Git',
        'GitHub',
        'CI/CD',
        'Jenkins',
        'Docker Exposure',
        'Kubernetes Exposure',
        'Windows Server Deployment',
        'Build & Deployment Support',
        'Environment Configuration',
        'NVM / Node Environment Management',
      ],
    },
    {
      name: 'Testing and debugging',
      level: 'Hands-on',
      note: 'Debugging and support skills for enterprise application delivery.',
      items: [
        'Playwright Exposure',
        'Debugging',
        'API Debugging',
        'Browser Developer Tools',
        'Frontend Troubleshooting',
        'Build Issue Resolution',
        'Performance Debugging',
        'Integration Testing Exposure',
        'Enterprise Application Support',
        'Root Cause Analysis',
      ],
    },
    {
      name: 'AI-assisted development',
      level: 'Working exposure',
      note: 'Developer productivity tooling used to speed up coding, debugging, and refactoring.',
      items: [
        'GitHub Copilot',
        'ChatGPT',
        'Claude',
        'AI-assisted Code Generation',
        'AI-assisted Debugging',
        'AI-assisted Refactoring',
        'Prompt-driven Development',
        'Developer Productivity using AI Tools',
      ],
    },
    {
      name: 'Domain and product experience',
      level: 'Hands-on',
      note: 'Domain context that makes the Angular experience more valuable than generic page building.',
      items: [
        'FinTech',
        'Digital Payments',
        'Banking Applications',
        'Core Banking Platforms',
        'Enterprise SaaS',
        'Payment Workflows',
        'Maker-Checker Workflows',
        'Transaction Management',
        'Deal Lifecycle Management',
        'Document Tracking Workflows',
        'Financial Data Interfaces',
        'Aviation Applications',
        'Aviation Domain Exposure',
        'Enterprise Product Development',
      ],
    },
    {
      name: 'Engineering and team practices',
      level: 'Hands-on',
      note: 'Day-to-day engineering habits that matter in senior Angular and frontend roles.',
      items: [
        'Frontend Development',
        'UI Engineering',
        'Software Development',
        'Requirement Analysis',
        'Technical Architecture',
        'Code Review',
        'Peer Code Review',
        'Pull Request Review',
        'Code Quality Improvement',
        'Coding Standards & Best Practices',
        'Code Refactoring Guidance',
        'Debugging Assistance',
        'Technical Problem Solving',
        'Technical Mentoring',
        'Junior Developer Mentoring',
        'Developer Guidance & Support',
        'Knowledge Sharing',
        'Technical Knowledge Transfer',
        'Team Collaboration',
        'Cross-functional Collaboration',
        'Backend Team Collaboration',
        'API Integration',
        'Supporting Team Members with Technical Issues',
        'Feature Implementation Guidance',
        'Architecture & Code Flow Guidance',
        'Production Issue Troubleshooting',
        'Requirement Understanding & Technical Guidance',
      ],
    },
    {
      name: 'Agile delivery',
      level: 'Hands-on',
      note: 'Product team collaboration and sprint execution experience.',
      items: [
        'Agile Methodology',
        'Scrum',
        'Sprint Planning',
        'Sprint Execution',
        'Daily Stand-ups',
        'Sprint Review',
        'Sprint Retrospectives',
        'Backlog Refinement / Grooming',
        'Jira',
        'Agile Software Development',
        'Cross-functional Agile Collaboration',
      ],
    },
  ];
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './sections/hero';
import { RecruiterSnapshot } from './sections/recruiter-snapshot';
import { WorkflowLab } from './sections/workflow-lab';
import { PerfDemo } from './sections/perf-demo';
import { StreamDemo } from './sections/stream-demo';
import { OpsBoard } from './sections/ops-board';
import { CaseStudies } from './sections/case-studies';
import { Skills } from './sections/skills';
import { Writing } from './sections/writing';
import { Contact } from './sections/contact';
import { Reveal } from './shared/reveal';
import { PerfHud } from './shared/perf-hud';
import { CommandPalette } from './shared/command-palette';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    Hero,
    RecruiterSnapshot,
    CaseStudies,
    Skills,
    WorkflowLab,
    PerfDemo,
    StreamDemo,
    OpsBoard,
    Writing,
    Contact,
    Reveal,
    PerfHud,
    CommandPalette,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly navLinks = [
    { href: '#snapshot', label: 'Fit' },
    { href: '#work', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#workflow-lab', label: 'Lab' },
    { href: '#demo', label: 'Demos' },
    { href: '#contact', label: 'Contact' },
  ];
}

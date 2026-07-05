import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Hero } from './sections/hero';
import { PerfDemo } from './sections/perf-demo';
import { StreamDemo } from './sections/stream-demo';
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
  imports: [Hero, PerfDemo, StreamDemo, CaseStudies, Skills, Writing, Contact, Reveal, PerfHud, CommandPalette],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly navLinks = [
    { href: '#demo', label: 'Demo' },
    { href: '#stream', label: 'Stream' },
    { href: '#work', label: 'Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#writing', label: 'Writing' },
    { href: '#contact', label: 'Contact' },
  ];
}

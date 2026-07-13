import { afterNextRender, Directive, ElementRef, inject } from '@angular/core';

/** Fades + rises an element into view the first time it enters the viewport. */
@Directive({ selector: '[appReveal]' })
export class Reveal {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const node = this.el.nativeElement;

      node.classList.add('reveal');

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.classList.add('reveal-in');
            io.disconnect();
          }
        },
        {
          threshold: 0.01,
          rootMargin: '0px 0px -40px 0px',
        },
      );

      io.observe(node);
    });
  }
}
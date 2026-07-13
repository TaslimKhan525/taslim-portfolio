import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ProofPoint {
  value: string;
  label: string;
}

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="top">
      <div class="hero-inner">
        <div class="hero-grid">
          
          <div class="hero-intro">
            <p class="kicker">// angular-first frontend engineer</p>
            <h1>
              Enterprise Angular frontend engineer for
              <span class="glow">workflow-driven applications.</span>
            </h1>
          </div>

          <div class="hero-portrait">
            <div class="portrait-container">
              <div class="portrait-image-wrapper">
                <div class="portrait-frame">
                  <img
                    src="images/taslim-khan.jpg"
                    alt="Taslim Khan"
                    class="portrait-img"
                  />
                </div>
              </div>
              <div class="portrait-caption">
                Taslim Khan // Angular Frontend Engineer
              </div>
            </div>
          </div>

          <div class="hero-body">
            <p class="lede">
              I build Angular applications for aviation operations and financial technology:
              scheduling interfaces, maker-checker workflows, data-heavy screens, reusable
              components, API-integrated UI, and production delivery.
            </p>
            <p class="support">
              Angular is my primary expertise, with professional experience across Angular 8-17,
              TypeScript, RxJS, REST APIs, complex forms, and cross-stack troubleshooting when
              product delivery requires it.
            </p>
          </div>

          <div class="hero-actions">
            <div class="role-fit" aria-label="Target roles">
              @for (role of targetRoles; track role) {
                <span>{{ role }}</span>
              }
            </div>
            <div class="cta-row">
              <a class="btn btn-primary" href="#work">View product engineering work</a>
              <a class="btn btn-ghost" href="#skills">Skills</a>
            </div>
          </div>

          <div class="hero-footer">
            <div class="stat-strip" aria-label="Profile highlights">
              @for (p of proofPoints; track p.label) {
                <div class="stat">
                  <span class="stat-value">{{ p.value }}</span>
                  <span class="stat-label">{{ p.label }}</span>
                </div>
              }
            </div>
            <p class="palette-hint">
              press <kbd>Ctrl</kbd> + <kbd>K</kbd> to navigate
            </p>
          </div>

        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      min-height: 92vh;
      display: flex;
      align-items: center;
      position: relative;
      overflow: hidden;
      background:
        radial-gradient(ellipse 60% 50% at 70% 20%, rgba(43, 164, 234, 0.10), transparent),
        radial-gradient(ellipse 50% 40% at 20% 80%, rgba(47, 208, 140, 0.06), transparent);
    }
    .hero::before {
      content: '';
      position: absolute;
      inset: -60px;
      background-image:
        linear-gradient(rgba(43, 164, 234, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(43, 164, 234, 0.05) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 20%, transparent 75%);
      animation: grid-pan 26s linear infinite;
      pointer-events: none;
    }
    @keyframes grid-pan {
      to { transform: translate(56px, 56px); }
    }
    .hero-inner {
      max-width: 1080px;
      margin: 0 auto;
      padding: 230px 24px 64px;
      position: relative;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-areas:
        "intro"
        "body"
        "actions"
        "footer";
      gap: 24px;
    }
    .hero-intro {
      grid-area: intro;
    }
    .hero-portrait {
      position: absolute;
      right: 16px;
      top: 100px;
      width: 150px;
      opacity: 0.36;
      pointer-events: none;
      z-index: 0;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    .hero-body {
      grid-area: body;
      position: relative;
      z-index: 1;
    }
    .hero-actions {
      grid-area: actions;
      position: relative;
      z-index: 1;
    }
    .hero-footer {
      grid-area: footer;
    }
    .portrait-container {
      position: relative;
      width: 100%;
      margin: 0;
    }
    .portrait-image-wrapper {
      position: relative;
      z-index: 1;
    }
    .portrait-image-wrapper::before {
      display: none;
    }
    .portrait-frame {
      position: relative;
      border-radius: var(--radius);
      border: none;
      overflow: hidden;
      aspect-ratio: 3 / 4;
      mask-image: linear-gradient(to right, transparent 0%, black 50%);
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 50%);
    }
    .portrait-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 18% 10%;
      display: block;
      filter: grayscale(100%) contrast(115%) brightness(145%);
    }
    .portrait-caption {
      display: none;
    }
    .kicker {
      font-family: var(--mono);
      color: var(--accent);
      font-size: 15px;
      margin: 0 0 18px;
    }
    h1 {
      font-size: clamp(38px, 6.2vw, 68px);
      line-height: 1.08;
      font-weight: 800;
      margin: 0 0 22px;
      max-width: 880px;
      position: relative;
      z-index: 1;
    }
    .glow {
      color: var(--accent);
      text-shadow: 0 0 34px var(--accent-glow);
    }
    .lede {
      font-size: clamp(16px, 2vw, 19px);
      color: var(--text-dim);
      max-width: 760px;
      margin: 0 0 18px;
    }
    .support {
      font-size: clamp(15px, 1.8vw, 17px);
      max-width: 720px;
      color: var(--text-faint);
      margin-bottom: 22px;
    }
    .role-fit {
      display: flex;
      flex-wrap: wrap;
      gap: 9px;
      margin-bottom: 34px;
      max-width: 760px;
    }
    .role-fit span {
      padding: 7px 11px;
      border-radius: 8px;
      border: 1px solid rgba(43, 164, 234, 0.45);
      background: rgba(43, 164, 234, 0.08);
      color: var(--text-dim);
      font-family: var(--mono);
      font-size: 12.5px;
    }
    .cta-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 56px; }
    .stat-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(140px, 1fr));
      gap: 22px;
      border-top: 1px solid var(--line);
      padding-top: 28px;
    }
    .stat { display: flex; flex-direction: column; }
    .stat-value {
      font-family: var(--mono);
      font-size: clamp(20px, 3vw, 28px);
      font-weight: 700;
      color: var(--accent);
    }
    .stat-label { font-size: 13.5px; color: var(--text-faint); }
    .palette-hint {
      margin: 40px 0 0;
      font-size: 13px;
      color: var(--text-faint);
    }
    kbd {
      font-family: var(--mono);
      font-size: 12px;
      padding: 2px 7px;
      border: 1px solid var(--line);
      border-bottom-width: 2px;
      border-radius: 5px;
      background: var(--bg-raised);
      color: var(--text-dim);
    }
    @media (min-width: 480px) {
      .hero-portrait {
        width: 180px;
        right: 16px;
        top: 110px;
      }
    }
    @media (min-width: 900px) {
      .hero-inner {
        padding-top: 100px;
      }
      .hero-grid {
        grid-template-columns: 1.25fr 0.75fr;
        grid-template-areas:
          "intro portrait"
          "body portrait"
          "actions portrait"
          "footer footer";
        gap: 0 56px;
        align-items: start;
      }
      .hero-intro {
        padding-right: 0;
      }
      .hero-portrait {
        position: static;
        width: auto;
        opacity: 1;
        pointer-events: auto;
        z-index: 1;
        justify-content: flex-end;
        align-items: stretch;
        padding-top: 0;
      }
      .hero-body {
        padding-right: 0;
      }
      .portrait-container {
        max-width: 300px;
        margin: 65px 0 0;
      }
      .portrait-image-wrapper::before {
        content: '';
        position: absolute;
        inset: 0;
        display: block;
        border: 1px solid var(--accent);
        border-radius: var(--radius);
        transform: translate(8px, 8px);
        z-index: -1;
        pointer-events: none;
        transition: transform 0.3s ease, opacity 0.3s ease;
        opacity: 0.5;
      }
      .portrait-container:hover .portrait-image-wrapper::before {
        transform: translate(5px, 5px);
        opacity: 0.8;
      }
      .portrait-frame {
        border-radius: var(--radius);
        border: 1px solid var(--line);
        box-shadow: none;
        aspect-ratio: 3 / 4;
        mask-image: none;
        -webkit-mask-image: none;
      }
      .portrait-container:hover .portrait-frame {
        border-radius: var(--radius);
      }
      .portrait-img {
        filter: none;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
      }
      .portrait-caption {
        display: block;
        text-align: left;
        padding-left: 2px;
        margin-top: 10px;
      }
    }
    @media (max-width: 760px) {
      .stat-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 480px) {
      .hero-inner { padding-top: 230px; }
      .stat-strip { grid-template-columns: 1fr; }
    }
  `,
})
export class Hero {
  readonly targetRoles = [
    'Angular Developer',
    'Senior Angular Developer',
    'Frontend Engineer',
    'Angular-focused Software Engineer',
  ];

  readonly proofPoints: ProofPoint[] = [
    { value: '3y 10m', label: 'professional software development experience' },
    { value: '8-17', label: 'professional Angular version experience' },
    { value: 'Angular', label: 'primary and strongest expertise' },
    { value: 'Aviation + FinTech', label: 'enterprise product domains' },
  ];
}

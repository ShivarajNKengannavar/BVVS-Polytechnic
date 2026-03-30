import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BvvsApiService } from '../../services/bvvs-api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  stats: any[]              = [];
  notices: any[]            = [];
  departments: any[]        = [];
  achievementList: any[]    = [];
  achievementHighlights: any[] = [];
  skillProgrammes: any[]    = [];
  floatCards: { icon: string; text: string }[] = [];
  rotateWords = ['Future Engineers', 'Innovators', 'Leaders', 'Problem Solvers'];
  rotateIdx = 0;

  deptPills  = ['🏗️ Civil Engineering','⚡ Electrical & Electronics','⚙️ Mechanical','🚗 Automobile','📡 Electronics & Communication','💻 Computer Science','🎛️ Instrumentation','💡 Information Science','📊 Commercial Practice','🔬 Science Dept.'];
  achPills   = ['🏆 NSS National Award','🌍 World Bank Assisted','🇨🇦 CIICP Project','🧘 Yoga Mandatory','🏭 Production Training Centre','🎓 Community College','🤖 Smart India Hackathon','🌱 CDTP Programme'];

  private carouselCleanup: (() => void) | null = null;
  private rotateTimer: ReturnType<typeof setInterval> | null = null;
  private typewriterTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private api: BvvsApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.api.getStats().subscribe(d => {
      this.stats = d;
      setTimeout(() => this.initCounters(), 300);
    });
    this.api.getNotices().subscribe(d => this.notices = d);
    this.api.getDepartments().subscribe(d => {
      this.departments = d;
      setTimeout(() => this.initCarousel(), 200);
    });
    this.api.getAchievements().subscribe(d => {
      this.achievementList     = d.list;
      this.achievementHighlights = d.highlights;
    });
    this.api.getSkillProgrammes().subscribe(d => this.skillProgrammes = d);
  }

  ngAfterViewInit(): void {
    this.initScrollReveal();
    this.initParallax();
    this.initRotate();
    this.initTypewriter();
  }

  ngOnDestroy(): void {
    if (this.carouselCleanup) this.carouselCleanup();
    if (this.rotateTimer) clearInterval(this.rotateTimer);
    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
  }

  nav(path: string): void {
    // Split path like 'academics/civil' into ['academics', 'civil']
    const segments = path.split('/').filter(s => s.length > 0);
    this.router.navigate(segments.length > 0 ? segments : ['/']);
  }

  openVideo(): void {
    (window as any).openVideoModal?.();
  }

  // ── Scroll Reveal ──────────────────────────────────────────────
  private initScrollReveal(): void {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => obs.observe(el));
  }

  // ── Counters ───────────────────────────────────────────────────
  private initCounters(): void {
    const cntObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const el     = e.target as HTMLElement;
          const target = +(el.dataset['target'] || 0);
          let current  = 0;
          const step   = target / (1800 / (1000 / 60));
          const t = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(t); }
            el.textContent = Math.round(current).toLocaleString();
          }, 1000 / 60);
          cntObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.count').forEach(el => cntObs.observe(el));
  }

  // ── Infinite Carousel (same engine as plain-HTML version) ──────
  private initCarousel(): void {
    const wrap    = document.getElementById('infWrap');
    const track   = document.getElementById('infTrack');
    const dotsEl  = document.querySelectorAll('#infDots .inf-dot');
    const prevBtn = document.getElementById('infPrev');
    const nextBtn = document.getElementById('infNext');
    const speedBtn = document.getElementById('speedBtn');
    if (!wrap || !track) return;

    const origCards  = Array.from(track.children) as HTMLElement[];
    const CARD_COUNT = origCards.length;

    origCards.forEach(c => track.appendChild(c.cloneNode(true)));
    origCards.forEach(c => track.appendChild(c.cloneNode(true)));

    const GAP = 24;
    let offset = 0, speed = 0.6, isPaused = false, isDragging = false;
    let dragStartX = 0, dragStartOffset = 0, isSpeedFast = false;
    let rafId: number;

    const getCardW   = () => (track.children[0] as HTMLElement).offsetWidth + GAP;
    const applyTx    = (x: number) => { track.style.transform = `translateX(${x}px)`; };

    const loopSnap = () => {
      const cw    = getCardW();
      const total = cw * CARD_COUNT;
      if (offset <= -total) { offset += total; track.classList.add('no-transition'); applyTx(offset); requestAnimationFrame(() => track.classList.remove('no-transition')); }
      if (offset > 0)       { offset -= total; track.classList.add('no-transition'); applyTx(offset); requestAnimationFrame(() => track.classList.remove('no-transition')); }
    };

    const updateDots = () => {
      const idx = Math.round(Math.abs(offset) / getCardW()) % CARD_COUNT;
      dotsEl.forEach((d, i) => d.classList.toggle('active', i === idx));
    };

    const tick = () => {
      if (!isPaused && !isDragging) { offset -= speed; applyTx(offset); loopSnap(); updateDots(); }
      rafId = requestAnimationFrame(tick);
    };
    tick();

    // Hover pause
    track.addEventListener('mouseenter', () => { isPaused = true;  wrap.classList.add('paused'); });
    track.addEventListener('mouseleave', () => { isPaused = false; wrap.classList.remove('paused'); });

    // Drag
    track.addEventListener('mousedown', (e: Event) => {
      const me = e as MouseEvent;
      isDragging = true; dragStartX = me.clientX; dragStartOffset = offset;
      track.classList.add('dragging'); e.preventDefault();
    });
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (!isDragging) return;
      offset = dragStartOffset - (e.clientX - dragStartX);
      applyTx(offset); loopSnap(); updateDots();
    });
    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false; track.classList.remove('dragging');
      offset = Math.round(offset / getCardW()) * getCardW(); applyTx(offset);
    });

    // Touch
    let txStart = 0, txOffStart = 0;
    track.addEventListener('touchstart', (e: Event) => { txStart = (e as TouchEvent).touches[0].clientX; txOffStart = offset; isPaused = true; }, { passive: true });
    track.addEventListener('touchmove',  (e: Event) => { offset = txOffStart - ((e as TouchEvent).touches[0].clientX - txStart); applyTx(offset); loopSnap(); updateDots(); }, { passive: true });
    track.addEventListener('touchend',   ()          => { isPaused = false; offset = Math.round(offset / getCardW()) * getCardW(); applyTx(offset); });

    // Prev / Next
    prevBtn?.addEventListener('click', () => { offset -= getCardW(); applyTx(offset); loopSnap(); updateDots(); });
    nextBtn?.addEventListener('click', () => { offset += getCardW(); applyTx(offset); loopSnap(); updateDots(); });

    // Speed
    speedBtn?.addEventListener('click', () => {
      isSpeedFast = !isSpeedFast;
      speed = isSpeedFast ? 1.4 : 0.6;
      if (speedBtn) speedBtn.textContent = isSpeedFast ? '🐢 Normal' : '⚡ Fast';
    });

    // Cleanup on destroy
    this.carouselCleanup = () => cancelAnimationFrame(rafId);
  }

  // ── Parallax ───────────────────────────────────────────────────
  private initParallax(): void {
    const onScroll = () => {
      const gl = document.querySelector('.hero-grid-lines') as HTMLElement;
      if (gl) gl.style.transform = `translateY(${window.scrollY * 0.2}px)`;
    };
    window.addEventListener('scroll', onScroll);
  }

  private initRotate(): void {
    if (this.rotateTimer) clearInterval(this.rotateTimer);
    this.rotateTimer = setInterval(() => {
      this.rotateIdx = (this.rotateIdx + 1) % this.rotateWords.length;
    }, 2200);
  }

  private initTypewriter(): void {
    const el = document.getElementById('twText');
    if (!el) return;

    const phrases = [
      'industry-ready technicians.',
      'community-focused professionals.',
      'innovation-driven learners.'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    if (this.typewriterTimer) clearInterval(this.typewriterTimer);
    this.typewriterTimer = setInterval(() => {
      const word = phrases[phraseIndex];
      if (!deleting) {
        charIndex++;
        el.textContent = word.slice(0, charIndex);
        if (charIndex >= word.length) {
          deleting = true;
        }
      } else {
        charIndex--;
        el.textContent = word.slice(0, charIndex);
        if (charIndex <= 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }
    }, 75);
  }

  scrollToAbout(): void {
    document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  go(path: string): void {
    this.router.navigate(['/' + path]);
  }

}

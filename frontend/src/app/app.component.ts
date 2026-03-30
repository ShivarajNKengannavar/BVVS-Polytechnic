import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BvvsApiService } from './services/bvvs-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  notices = [
    { text: 'Nov-2025 Exam Results (C-21 & C-25) — Available Now', url: 'https://resultstest.digitalmis.com/' },
    { text: 'Nov-2025 Exam Results (C-15 & C-19) — Check Now', url: 'https://results.bvvspolytech.com/' },
    { text: 'NITTTR Registration Link — Download PDF', url: 'https://bvvspolytech.com/downloads/NITTTR.pdf' },
    { text: 'Registration Open: What Next After SSLC?', url: 'https://forms.gle/Gs4VUccHWghX437s7' },
    { text: 'ISTE Student Convention — Brochure Available', url: 'https://bvvspolytech.com/downloads/ISTE_Student_Convention_Brochure.pdf' },
    { text: 'Nov-2025 Exam Postponement Circular', url: 'https://bvvspolytech.com/downloads/exampostpone.pdf' }
  ];

  isAdminPage = false;
  private rafId = 0;
  private particleRafId = 0;

  constructor(private router: Router, private api: BvvsApiService) {}

  ngOnInit(): void {
    this.api.getNotices().subscribe({
      next: (items) => {
        if (items?.length) this.notices = items;
      },
      error: () => {}
    });

    // Detect admin pages to hide navbar/footer/ticker
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: any) => {
      this.isAdminPage = e.url.startsWith('/admin');
    });

    this.initCursor();
    this.initParticles();
    this.initVideoModal();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
    cancelAnimationFrame(this.particleRafId);
  }

  private initCursor(): void {
    const cur  = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    if (!cur || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    });
    const lerp = () => {
      rx += (mx - rx) * 0.13; ry += (my - ry) * 0.13;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      this.rafId = requestAnimationFrame(lerp);
    };
    this.rafId = requestAnimationFrame(lerp);
  }

  private initParticles(): void {
    const canvas = document.getElementById('particles') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });
    const pts: any[] = [];
    for (let i = 0; i < 80; i++) {
      pts.push({ x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-0.5)*0.3, vy:(Math.random()-0.5)*0.3, r:Math.random()*1.4+0.4, a:Math.random()*0.35+0.08, gold:Math.random()>0.6 });
    }
    const animate = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W||p.y<0||p.y>H){p.x=Math.random()*W;p.y=Math.random()*H;}
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle = p.gold ? `rgba(212,168,67,${p.a})` : `rgba(80,130,200,${p.a*0.6})`;
        ctx.fill();
      });
      this.particleRafId = requestAnimationFrame(animate);
    };
    this.particleRafId = requestAnimationFrame(animate);
  }

  private initVideoModal(): void {
    setTimeout(() => {
      const modal = document.getElementById('videoModal');
      const video = document.getElementById('heroVideo') as HTMLVideoElement;
      const close = document.getElementById('videoClose');
      const bg    = document.getElementById('videoBg');
      if (!modal || !video) return;

      (window as any).openVideoModal = () => {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        video.play().catch(() => {});
      };
      const closeModal = () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        video.pause();
        video.currentTime = 0;
      };
      close?.addEventListener('click', closeModal);
      bg?.addEventListener('click', closeModal);
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    }, 500);
  }
}

import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Achievement {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  colorDim: string;
  displayValue: number;
}

@Component({
  selector: 'app-achievements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;

  private animTimers: ReturnType<typeof setInterval>[] = [];
  private observer!: IntersectionObserver;
  private countersStarted = false;

  achievements: Achievement[] = [
    { value: 2,  suffix: '+', label: 'Years Experience',      sublabel: 'Professional .NET Development',  icon: 'fa-solid fa-calendar-check',    color: '#3b82f6', colorDim: 'rgba(59,130,246,0.12)',  displayValue: 0 },
    { value: 5,  suffix: '+', label: 'Enterprise Projects',   sublabel: 'Across multiple business domains', icon: 'fa-solid fa-diagram-project',  color: '#818cf8', colorDim: 'rgba(129,140,248,0.12)', displayValue: 0 },
    { value: 10, suffix: '+', label: 'Technologies',          sublabel: 'Full stack mastery',               icon: 'fa-solid fa-code',              color: '#34d399', colorDim: 'rgba(52,211,153,0.12)',  displayValue: 0 },
    { value: 4,  suffix: '',  label: 'Business Domains',      sublabel: 'Healthcare, Fleet, Service, Doc',  icon: 'fa-solid fa-briefcase',         color: '#fbbf24', colorDim: 'rgba(251,191,36,0.12)',  displayValue: 0 },
    { value: 5,  suffix: '',  label: 'AI Tools Mastered',     sublabel: 'ChatGPT, Copilot, Claude & more',  icon: 'fa-solid fa-robot',             color: '#06b6d4', colorDim: 'rgba(6,182,212,0.12)',   displayValue: 0 },
    { value: 1,  suffix: '+', label: 'Year at Milesoft',      sublabel: 'June 2024 – Present',              icon: 'fa-solid fa-building',          color: '#f472b6', colorDim: 'rgba(244,114,182,0.12)', displayValue: 0 }
  ];

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          if (!this.countersStarted) {
            this.countersStarted = true;
            this.startCounters();
          }
          this.observer.unobserve(e.target);
        }
      }),
      { threshold: 0.2 }
    );
    this.animElements.forEach(el => this.observer.observe(el.nativeElement));
  }

  private startCounters() {
    this.achievements.forEach((ach, idx) => {
      const duration = 1800;
      const steps = 60;
      const stepValue = ach.value / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        current = Math.min(Math.round(stepValue * step), ach.value);
        this.achievements[idx].displayValue = current;
        if (step >= steps) clearInterval(timer);
      }, duration / steps);

      this.animTimers.push(timer);
    });
  }

  ngOnDestroy() {
    this.animTimers.forEach(t => clearInterval(t));
    if (this.observer) this.observer.disconnect();
  }
}

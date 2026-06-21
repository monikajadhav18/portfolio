import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ElementRef, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('typingEl') typingEl!: ElementRef<HTMLSpanElement>;

  currentYear = new Date().getFullYear();
  typingTexts = [
    'ASP.NET Developer',
    'Angular Developer',
    'API Developer',
    'Full Stack Engineer',
    'AI Enthusiast'
  ];

  currentTypingText = '';
  private typingIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typingTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly typingSpeed = 90;
  private readonly deletingSpeed = 50;
  private readonly pauseAfterType = 1800;
  private readonly pauseAfterDelete = 400;

  socialLinks = [
    { icon: 'fab fa-github',   href: 'https://github.com',    label: 'GitHub',   color: '#f0f0f0' },
    { icon: 'fab fa-linkedin', href: 'https://linkedin.com',  label: 'LinkedIn', color: '#0a66c2' },
    { icon: 'fas fa-envelope', href: 'mailto:mvjadhav18@gmail.com', label: 'Email', color: '#ea4335' }
  ];

  stats = [
    { value: '2+', label: 'Years Experience', icon: 'fa-calendar-check' },
    { value: '5+', label: 'Enterprise Projects', icon: 'fa-diagram-project' },
    { value: '10+', label: 'Technologies', icon: 'fa-code' },
    { value: '5',  label: 'Business Domains', icon: 'fa-briefcase' }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    setTimeout(() => this.typeLoop(), 800);
  }

  ngOnDestroy() {
    if (this.typingTimer) clearTimeout(this.typingTimer);
  }

  private typeLoop() {
    const currentText = this.typingTexts[this.typingIndex];

    if (this.isDeleting) {
      this.currentTypingText = currentText.substring(0, this.charIndex - 1);
      this.charIndex--;
    } else {
      this.currentTypingText = currentText.substring(0, this.charIndex + 1);
      this.charIndex++;
    }

    let delay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

    if (!this.isDeleting && this.charIndex === currentText.length) {
      // Full word typed — pause
      this.isDeleting = true;
      delay = this.pauseAfterType;
    } else if (this.isDeleting && this.charIndex === 0) {
      // Fully deleted — move to next
      this.isDeleting = false;
      this.typingIndex = (this.typingIndex + 1) % this.typingTexts.length;
      delay = this.pauseAfterDelete;
    }

    this.typingTimer = setTimeout(() => this.typeLoop(), delay);
  }

  scrollTo(href: string) {
    const el = document.querySelector(href);
    if (el) {
      const top = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}

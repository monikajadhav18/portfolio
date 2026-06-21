import {
  Component, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {
  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;

  highlights = [
    {
      icon: 'fa-solid fa-layer-group',
      title: 'Full Stack Expertise',
      desc: 'End-to-end development from database design to polished UI, using ASP.NET Core and Angular.'
    },
    {
      icon: 'fa-solid fa-hospital',
      title: 'Enterprise Domains',
      desc: 'Hands-on experience in Healthcare, Fleet, Service, and Document Management systems.'
    },
    {
      icon: 'fa-solid fa-robot',
      title: 'AI-Driven Development',
      desc: 'Leveraging ChatGPT, GitHub Copilot, and Claude to accelerate delivery and code quality.'
    },
    {
      icon: 'fa-solid fa-code-branch',
      title: 'Clean Architecture',
      desc: 'Committed to SOLID principles, scalable patterns, and production-grade code standards.'
    }
  ];

  quickFacts = [
    { icon: 'fa-solid fa-map-marker-alt', label: 'Location', value: 'Nashik, Maharashtra, India' },
    { icon: 'fa-solid fa-envelope',       label: 'Email',    value: 'mvjadhav18@gmail.com', link: 'mailto:mvjadhav18@gmail.com' },
    { icon: 'fa-solid fa-briefcase',      label: 'Company',  value: 'Milesoft Software Technologies' },
    { icon: 'fa-solid fa-calendar-alt',   label: 'Experience', value: '2+ Years' },
    { icon: 'fa-solid fa-globe',          label: 'Available', value: 'Open to Opportunities', highlight: true }
  ];

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    this.animElements.forEach(el => observer.observe(el.nativeElement));
  }
}

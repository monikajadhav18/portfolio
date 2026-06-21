import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  navLinks = [
    { label: 'Home',       href: '#home' },
    { label: 'About',      href: '#about' },
    { label: 'Skills',     href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',   href: '#projects' },
    { label: 'AI Tools',   href: '#ai-tools' },
    { label: 'Contact',    href: '#contact' }
  ];

  socialLinks = [
    { icon: 'fab fa-github',   href: 'https://github.com',           label: 'GitHub' },
    { icon: 'fab fa-linkedin', href: 'https://linkedin.com',         label: 'LinkedIn' },
    { icon: 'fas fa-envelope', href: 'mailto:mvjadhav18@gmail.com',  label: 'Email' }
  ];

  techStack = ['.NET', 'Angular', 'C#', 'SQL', 'TypeScript'];

  scrollTo(href: string, e: Event) {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  scrollToTop(e: Event) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import {
  Component, OnInit, OnDestroy, HostListener, Inject
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';

  navItems: NavItem[] = [
    { label: 'Home',       href: '#home',       icon: 'fa-house' },
    { label: 'About',      href: '#about',      icon: 'fa-user' },
    { label: 'Skills',     href: '#skills',     icon: 'fa-code' },
    { label: 'Experience', href: '#experience', icon: 'fa-briefcase' },
    { label: 'Projects',   href: '#projects',   icon: 'fa-diagram-project' },
    { label: 'AI Tools',   href: '#ai-tools',   icon: 'fa-robot' },
    { label: 'Contact',    href: '#contact',    icon: 'fa-envelope' }
  ];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit() {
    this.updateActiveSection();
  }

  ngOnDestroy() {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 60;
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const sections = this.navItems.map(item => item.href.slice(1));
    const offset = 120;

    for (let i = sections.length - 1; i >= 0; i--) {
      const el = this.document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= offset) {
        this.activeSection = sections[i];
        return;
      }
    }
    this.activeSection = 'home';
  }

  scrollTo(href: string, event: Event) {
    event.preventDefault();
    this.isMobileMenuOpen = false;

    const id = href.slice(1);
    const el = this.document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  isActive(href: string): boolean {
    return this.activeSection === href.slice(1);
  }
}

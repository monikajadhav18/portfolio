import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Responsibility {
  text: string;
  icon: string;
}

interface ExperienceItem {
  company: string;
  companyShort: string;
  role: string;
  duration: string;
  period: string;
  type: string;
  location: string;
  current: boolean;
  description: string;
  responsibilities: Responsibility[];
  tech: string[];
  highlights: { value: string; label: string }[];
}

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;

  experiences: ExperienceItem[] = [
    {
      company: 'Milesoft Software Technologies',
      companyShort: 'Milesoft',
      role: 'Full Stack Web Developer',
      duration: 'June 2024 – Present',
      period: '2024 – Present',
      type: 'Full-time',
      location: 'Nashik, Maharashtra',
      current: true,
      description:
        'Working on enterprise-grade web applications across Healthcare, Fleet, Service, and Document Management domains using ASP.NET MVC, ASP.NET Core Web API, Angular, and SQL Server.',
      responsibilities: [
        { icon: 'fa-solid fa-code',             text: 'Developing enterprise applications using ASP.NET MVC and Angular with clean architecture patterns.' },
        { icon: 'fa-solid fa-plug',             text: 'Building secure and scalable REST APIs consumed by Angular frontends and third-party integrations.' },
        { icon: 'fa-solid fa-database',         text: 'SQL Server database development including stored procedures, query optimization, and schema design.' },
        { icon: 'fa-solid fa-hospital',         text: 'Healthcare Management modules: patient registration, appointment scheduling, and medical records.' },
        { icon: 'fa-solid fa-truck',            text: 'Fleet Management modules: vehicle booking, allocation, utilization tracking, and reporting.' },
        { icon: 'fa-solid fa-headset',          text: 'Service Management modules: customer support, product service tracking, and request processing.' },
        { icon: 'fa-solid fa-file-lines',       text: 'Document Management workflows with approval chains and role-based access control.' },
        { icon: 'fa-solid fa-signature',        text: 'Digital Signature integration enabling legally compliant secure document approval systems.' }
      ],
      tech: ['C#', 'ASP.NET MVC', 'ASP.NET Core', 'Web API', 'Angular', 'TypeScript', 'SQL Server', 'Entity Framework', 'Bootstrap', 'Git'],
      highlights: [
        { value: '5+', label: 'Projects Delivered' },
        { value: '4',  label: 'Business Domains' },
        { value: '1+', label: 'Year Active' }
      ]
    }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    this.animElements.forEach(el => observer.observe(el.nativeElement));
  }
}

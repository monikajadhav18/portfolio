import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  longDesc: string;
  category: string;
  status: 'live' | 'complete' | 'coming-soon';
  statusLabel: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  gradientFrom: string;
  gradientTo: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements AfterViewInit {
  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;

  activeFilter = 'all';

  filters = [
    { id: 'all',      label: 'All Projects', icon: 'fa-solid fa-grid-2' },
    { id: 'aspnet',   label: 'ASP.NET',      icon: 'fa-solid fa-server' },
    { id: 'angular',  label: 'Angular',      icon: 'fa-brands fa-angular' },
    { id: 'ai',       label: 'AI / Future',  icon: 'fa-solid fa-robot' }
  ];

  projects: Project[] = [
    {
      id: 1,
      title: 'Healthcare Management System',
      shortTitle: 'Healthcare',
      description: 'Enterprise patient care platform handling registrations, appointments, and medical records for a healthcare provider.',
      longDesc: 'A comprehensive healthcare solution enabling clinics to manage their entire patient lifecycle — from initial registration through consultation and medical history tracking.',
      category: 'aspnet',
      status: 'live',
      statusLabel: 'Production',
      icon: 'fa-solid fa-hospital',
      iconColor: '#34d399',
      iconBg: 'rgba(52,211,153,0.12)',
      gradientFrom: 'rgba(52,211,153,0.08)',
      gradientTo: 'rgba(6,182,212,0.04)',
      tech: ['ASP.NET MVC', 'C#', 'SQL Server', 'Bootstrap', 'jQuery'],
      features: ['Patient Registration', 'Appointment Scheduling', 'Consultation Management', 'Medical Records Tracking'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true
    },
    {
      id: 2,
      title: 'Fleet Management System',
      shortTitle: 'Fleet',
      description: 'Vehicle lifecycle and logistics platform for tracking bookings, allocations, and utilization across a fleet.',
      longDesc: 'End-to-end fleet management covering vehicle booking workflows, driver allocation, real-time utilization dashboards, and auto-generated reports.',
      category: 'aspnet',
      status: 'live',
      statusLabel: 'Production',
      icon: 'fa-solid fa-truck',
      iconColor: '#fbbf24',
      iconBg: 'rgba(251,191,36,0.12)',
      gradientFrom: 'rgba(251,191,36,0.07)',
      gradientTo: 'rgba(249,115,22,0.04)',
      tech: ['ASP.NET MVC', 'C#', 'SQL Server', 'Bootstrap', 'SSRS'],
      features: ['Vehicle Booking', 'Vehicle Allocation', 'Utilization Tracking', 'Reporting Modules'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true
    },
    {
      id: 3,
      title: 'Document Management System',
      shortTitle: 'DocMgmt',
      description: 'Secure document approval platform with digital signature integration and multi-stage workflow chains.',
      longDesc: 'A robust document lifecycle solution featuring configurable approval workflows, legal digital signatures, version history, and role-based access control.',
      category: 'aspnet',
      status: 'live',
      statusLabel: 'Production',
      icon: 'fa-solid fa-file-signature',
      iconColor: '#818cf8',
      iconBg: 'rgba(129,140,248,0.12)',
      gradientFrom: 'rgba(129,140,248,0.08)',
      gradientTo: 'rgba(59,130,246,0.04)',
      tech: ['ASP.NET MVC', 'C#', 'SQL Server', 'Digital Signature API', 'Bootstrap'],
      features: ['Approval Workflows', 'Digital Signature Integration', 'Secure Document Handling', 'Role-Based Access'],
      githubUrl: '#',
      demoUrl: '#',
      featured: false
    },
    {
      id: 4,
      title: 'Service Management System',
      shortTitle: 'Service',
      description: 'Customer support and product service tracking portal built on Angular + ASP.NET Core Web API.',
      longDesc: 'Full-stack service management solution enabling businesses to handle support tickets, track product servicing, and manage technician assignments through a modern Angular UI.',
      category: 'angular',
      status: 'live',
      statusLabel: 'Production',
      icon: 'fa-solid fa-headset',
      iconColor: '#f472b6',
      iconBg: 'rgba(244,114,182,0.12)',
      gradientFrom: 'rgba(244,114,182,0.08)',
      gradientTo: 'rgba(129,140,248,0.04)',
      tech: ['ASP.NET Core Web API', 'Angular', 'TypeScript', 'SQL Server', 'Bootstrap'],
      features: ['Customer Support Management', 'Product Service Tracking', 'Service Request Processing', 'Technician Assignment'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true
    },
    {
      id: 5,
      title: 'AI Resume Analyzer',
      shortTitle: 'AI Resume',
      description: 'Intelligent resume analysis tool using OpenAI to provide ATS scoring, skill gap analysis, and improvement suggestions.',
      longDesc: 'An AI-powered platform where candidates upload their resume and receive detailed ATS compatibility scores, skill gap identification, and actionable improvement prompts — all powered by OpenAI API.',
      category: 'ai',
      status: 'coming-soon',
      statusLabel: 'Coming Soon',
      icon: 'fa-solid fa-brain',
      iconColor: '#06b6d4',
      iconBg: 'rgba(6,182,212,0.12)',
      gradientFrom: 'rgba(6,182,212,0.08)',
      gradientTo: 'rgba(59,130,246,0.04)',
      tech: ['Angular', 'ASP.NET Core', 'OpenAI API', 'TypeScript', 'SQL Server'],
      features: ['Resume Upload & Parse', 'ATS Score Analysis', 'AI-Powered Suggestions', 'Skill Gap Identification'],
      githubUrl: '#',
      demoUrl: '#',
      featured: true
    }
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'all') return this.projects;
    return this.projects.filter(p => p.category === this.activeFilter);
  }

  setFilter(id: string) {
    this.activeFilter = id;
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    this.animElements.forEach(el => observer.observe(el.nativeElement));
  }
}

import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AiTool {
  name: string;
  tagline: string;
  icon: string;
  color: string;
  colorDim: string;
  uses: string[];
  proficiency: number;
}

interface AiUseCase {
  icon: string;
  title: string;
  desc: string;
  color: string;
}

@Component({
  selector: 'app-ai-tools',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-tools.component.html',
  styleUrls: ['./ai-tools.component.scss']
})
export class AiToolsComponent implements AfterViewInit {
  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;

  tools: AiTool[] = [
    {
      name: 'ChatGPT',
      tagline: 'OpenAI',
      icon: 'fa-solid fa-comments',
      color: '#34d399',
      colorDim: 'rgba(52,211,153,0.1)',
      uses: ['Architecture Planning', 'Code Review', 'Documentation', 'Problem Solving'],
      proficiency: 88
    },
    {
      name: 'GitHub Copilot',
      tagline: 'Microsoft / OpenAI',
      icon: 'fa-solid fa-wand-magic-sparkles',
      color: '#818cf8',
      colorDim: 'rgba(129,140,248,0.1)',
      uses: ['Inline Code Completion', 'Boilerplate Generation', 'Unit Test Writing', 'Refactoring'],
      proficiency: 85
    },
    {
      name: 'Claude',
      tagline: 'Anthropic',
      icon: 'fa-solid fa-brain',
      color: '#f472b6',
      colorDim: 'rgba(244,114,182,0.1)',
      uses: ['Complex Reasoning', 'API Design', 'Code Explanation', 'Technical Writing'],
      proficiency: 84
    },
    {
      name: 'Gemini',
      tagline: 'Google DeepMind',
      icon: 'fa-solid fa-gem',
      color: '#fbbf24',
      colorDim: 'rgba(251,191,36,0.1)',
      uses: ['Research & Learning', 'Multi-modal Tasks', 'Content Generation', 'Data Analysis'],
      proficiency: 78
    },
    {
      name: 'Cursor AI',
      tagline: 'AI-Native IDE',
      icon: 'fa-solid fa-terminal',
      color: '#06b6d4',
      colorDim: 'rgba(6,182,212,0.1)',
      uses: ['AI-Powered Editing', 'Codebase Chat', 'Auto-Debugging', 'Smart Refactor'],
      proficiency: 80
    }
  ];

  useCases: AiUseCase[] = [
    {
      icon: 'fa-solid fa-code',
      title: 'Code Generation',
      desc: 'Scaffolding controllers, services, DTOs, and Angular components in seconds — not minutes.',
      color: '#818cf8'
    },
    {
      icon: 'fa-solid fa-bug',
      title: 'Debugging',
      desc: 'Pasting error traces to AI and getting root-cause analysis with fix suggestions instantly.',
      color: '#f87171'
    },
    {
      icon: 'fa-solid fa-book-open',
      title: 'Documentation',
      desc: 'Auto-generating XML doc comments, Swagger annotations, and README files from code context.',
      color: '#34d399'
    },
    {
      icon: 'fa-solid fa-plug',
      title: 'API Design',
      desc: 'Designing clean REST contract schemas, error response models, and endpoint conventions.',
      color: '#fbbf24'
    },
    {
      icon: 'fa-solid fa-graduation-cap',
      title: 'Learning',
      desc: 'Understanding new frameworks, design patterns, and best practices through guided AI dialogue.',
      color: '#06b6d4'
    },
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Code Review',
      desc: 'Catching edge cases, security issues, and performance anti-patterns before they reach production.',
      color: '#f472b6'
    }
  ];

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

import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  colorDim: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit {
  @ViewChildren('animEl') animElements!: QueryList<ElementRef>;

  activeCategory = 'backend';

  categories: SkillCategory[] = [
    {
      id: 'backend',
      label: 'Backend',
      icon: 'fa-solid fa-server',
      color: '#818cf8',
      colorDim: 'rgba(129,140,248,0.12)',
      skills: [
        { name: 'C#',              level: 90, icon: 'fa-solid fa-hashtag' },
        { name: 'ASP.NET MVC',     level: 88, icon: 'fa-solid fa-cubes' },
        { name: 'ASP.NET Core',    level: 85, icon: 'fa-solid fa-cube' },
        { name: 'Web API',         level: 87, icon: 'fa-solid fa-plug' },
        { name: 'Entity Framework',level: 82, icon: 'fa-solid fa-database' },
        { name: 'LINQ',            level: 83, icon: 'fa-solid fa-filter' }
      ]
    },
    {
      id: 'frontend',
      label: 'Frontend',
      icon: 'fa-solid fa-display',
      color: '#f472b6',
      colorDim: 'rgba(244,114,182,0.12)',
      skills: [
        { name: 'Angular',      level: 86, icon: 'fa-brands fa-angular' },
        { name: 'TypeScript',   level: 84, icon: 'fa-solid fa-code' },
        { name: 'JavaScript',   level: 82, icon: 'fa-brands fa-js' },
        { name: 'HTML5',        level: 92, icon: 'fa-brands fa-html5' },
        { name: 'CSS3 / SCSS',  level: 88, icon: 'fa-brands fa-css3-alt' },
        { name: 'Bootstrap',    level: 87, icon: 'fa-brands fa-bootstrap' }
      ]
    },
    {
      id: 'database',
      label: 'Database',
      icon: 'fa-solid fa-database',
      color: '#34d399',
      colorDim: 'rgba(52,211,153,0.12)',
      skills: [
        { name: 'SQL Server',         level: 88, icon: 'fa-solid fa-server' },
        { name: 'MySQL',              level: 78, icon: 'fa-solid fa-database' },
        { name: 'Stored Procedures',  level: 84, icon: 'fa-solid fa-file-code' },
        { name: 'Query Optimization', level: 80, icon: 'fa-solid fa-bolt' },
        { name: 'SSMS',               level: 82, icon: 'fa-solid fa-table' }
      ]
    },
    {
      id: 'tools',
      label: 'Tools',
      icon: 'fa-solid fa-wrench',
      color: '#fbbf24',
      colorDim: 'rgba(251,191,36,0.12)',
      skills: [
        { name: 'Git / GitHub',   level: 88, icon: 'fa-brands fa-git-alt' },
        { name: 'Visual Studio',  level: 90, icon: 'fa-solid fa-laptop-code' },
        { name: 'VS Code',        level: 88, icon: 'fa-solid fa-code' },
        { name: 'Postman',        level: 85, icon: 'fa-solid fa-satellite-dish' },
        { name: 'Swagger',        level: 80, icon: 'fa-solid fa-book-open' }
      ]
    },
    {
      id: 'ai',
      label: 'AI Tools',
      icon: 'fa-solid fa-robot',
      color: '#06b6d4',
      colorDim: 'rgba(6,182,212,0.12)',
      skills: [
        { name: 'ChatGPT',          level: 88, icon: 'fa-solid fa-comments' },
        { name: 'GitHub Copilot',   level: 85, icon: 'fa-solid fa-magic' },
        { name: 'Claude',           level: 84, icon: 'fa-solid fa-brain' },
        { name: 'Gemini',           level: 78, icon: 'fa-solid fa-gem' },
        { name: 'Cursor AI',        level: 80, icon: 'fa-solid fa-terminal' },
        { name: 'Prompt Engineering',level:82, icon: 'fa-solid fa-pen-nib' }
      ]
    }
  ];

  get activeData(): SkillCategory {
    return this.categories.find(c => c.id === this.activeCategory) || this.categories[0];
  }

  setCategory(id: string) {
    this.activeCategory = id;
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    this.animElements.forEach(el => observer.observe(el.nativeElement));
  }

  getLevelLabel(level: number): string {
    if (level >= 88) return 'Expert';
    if (level >= 80) return 'Advanced';
    if (level >= 70) return 'Proficient';
    return 'Familiar';
  }
}

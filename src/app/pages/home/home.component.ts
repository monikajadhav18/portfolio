import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent }         from '../../components/hero/hero.component';
import { AboutComponent }        from '../../components/about/about.component';
import { SkillsComponent }       from '../../components/skills/skills.component';
import { ExperienceComponent }   from '../../components/experience/experience.component';
import { ProjectsComponent }     from '../../components/projects/projects.component';
import { AiToolsComponent }      from '../../components/ai-tools/ai-tools.component';
import { AchievementsComponent } from '../../components/achievements/achievements.component';
import { ContactComponent }      from '../../components/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    AiToolsComponent,
    AchievementsComponent,
    ContactComponent
  ],
  template: `
    <main>
      <app-hero></app-hero>
      <app-about></app-about>
      <app-skills></app-skills>
      <app-experience></app-experience>
      <app-projects></app-projects>
      <app-ai-tools></app-ai-tools>
      <app-achievements></app-achievements>
      <app-contact></app-contact>
    </main>
  `
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { NavbarComponent }  from './components/navbar/navbar.component';
import { FooterComponent }  from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LoadingComponent, NavbarComponent, FooterComponent],
  template: `
    <div class="noise-overlay"></div>

    <app-loading
      *ngIf="isLoading"
      (loadingComplete)="onLoadingComplete()">
    </app-loading>

    <div [class.portfolio-hidden]="isLoading" class="portfolio-wrapper" [class.portfolio-visible]="!isLoading">
      <app-navbar></app-navbar>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .portfolio-wrapper {
      opacity: 0;
      transition: opacity 0.6s ease;
    }
    .portfolio-visible { opacity: 1; }
    .portfolio-hidden  { visibility: hidden; position: absolute; pointer-events: none; }
  `]
})
export class AppComponent {
  isLoading = true;

  onLoadingComplete() {
    this.isLoading = false;
  }
}

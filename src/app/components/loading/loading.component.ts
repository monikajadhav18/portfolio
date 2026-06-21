import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger, style, transition, animate
} from '@angular/animations';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('screenExit', [
      transition(':leave', [
        animate('0.8s 0.3s cubic-bezier(0.4, 0, 0.2, 1)', style({
          opacity: 0,
          transform: 'scale(1.04)'
        }))
      ])
    ])
  ],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Output() loadingComplete = new EventEmitter<void>();

  progress = 0;
  statusText = 'Initializing...';

  private statusMessages = [
    'Initializing systems...',
    'Loading components...',
    'Configuring environment...',
    'Rendering portfolio...',
    'Almost ready...'
  ];

  ngOnInit() {
    this.runLoadingSequence();
  }

  private runLoadingSequence() {
    const totalDuration = 2800;
    const steps = 100;
    const interval = totalDuration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      this.progress = step;

      const msgIndex = Math.floor((step / 100) * this.statusMessages.length);
      if (msgIndex < this.statusMessages.length) {
        this.statusText = this.statusMessages[msgIndex];
      }

      if (step >= 100) {
        clearInterval(timer);
        this.statusText = 'Welcome!';
        setTimeout(() => {
          this.loadingComplete.emit();
        }, 500);
      }
    }, interval);
  }
}

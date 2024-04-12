import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from './features/timer/components/timer/timer.component';
import { PomodoroComponent } from './features/timer/components/pomodoro/pomodoro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TimerComponent, PomodoroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pomovu';
}

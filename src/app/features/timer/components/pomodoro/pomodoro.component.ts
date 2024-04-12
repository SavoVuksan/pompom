import { Component, inject } from '@angular/core';
import { pomodoroStore } from '../../data/pomodoro.store';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'pomodoro',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss'
})
export class PomodoroComponent {
  pomodoroStore = inject(pomodoroStore);
}

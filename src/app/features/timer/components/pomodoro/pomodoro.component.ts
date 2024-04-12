import { Component, ViewChild, effect, inject } from '@angular/core';
import { PomodoroStore } from '../../data/pomodoro.store';
import { TimerComponent } from '../timer/timer.component';
import { TimerStore } from '../../data/timer.store';
import { patchState } from '@ngrx/signals';

@Component({
  selector: 'pomodoro',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './pomodoro.component.html',
  styleUrl: './pomodoro.component.scss'
})
export class PomodoroComponent {
  pomodoroStore = inject(PomodoroStore);
  @ViewChild(TimerComponent)
  timer!: TimerComponent;

  constructor() {
    effect(() => {
      if (this.pomodoroStore.state()) {
        patchState(this.timer.timerStore, (this.pomodoroStore.getTimerStoreData()))
      }
    }, { allowSignalWrites: true })
  }
}

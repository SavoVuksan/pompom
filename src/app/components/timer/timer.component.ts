import { Component, HostBinding, OnInit, effect, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  filter,
  interval,
  skipWhile,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
  timer,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PomodoroStore } from '../../stores/pomodoro.store';
import { BreakCounterComponent } from '../break-counter/break-counter.component';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [ButtonModule, CardModule, AsyncPipe, BreakCounterComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  host: { class: 'p-4 m-4' },
  providers: [],
})
export class TimerComponent implements OnInit {
  pomodoroStore = inject(PomodoroStore);

  constructor() {
    effect(
      () => {
        if (
          this.pomodoroStore.timerData.state() === 'completed' &&
          this.pomodoroStore.state() === 'focus'
        ) {
          this.pomodoroStore.stopTimer();
          this.pomodoroStore.switchToBreak();
        } else if (
          this.pomodoroStore.timerData.state() === 'completed' &&
          this.pomodoroStore.state() === 'break'
        ) {
          this.pomodoroStore.stopTimer();
          this.pomodoroStore.switchToFocus();
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {}

  onClick() {
    if (
      this.pomodoroStore.timerData.state() === 'not-started' ||
      this.pomodoroStore.timerData.state() === 'paused'
    ) {
      this.pomodoroStore.startTimer();
    } else if (this.pomodoroStore.timerData.state() === 'running') {
      this.pomodoroStore.pauseTimer();
    }
  }
}

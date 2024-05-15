import {
  Component,
  HostBinding,
  OnInit,
  WritableSignal,
  effect,
  inject,
} from '@angular/core';
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
import { SettingsStore } from '../../stores/settings.store';
import { TimerState, TimerStore } from '../../stores/timer.store';
import { getState } from '@ngrx/signals';
import { STATE_SIGNAL } from '@ngrx/signals/src/state-signal';
import { Signal } from '@ngrx/signals/src/deep-signal';

@Component({
  selector: 'timer',
  standalone: true,
  imports: [ButtonModule, CardModule, AsyncPipe, BreakCounterComponent],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  host: { class: 'p-4 m-4' },
  providers: [],
})
export class TimerComponent {
  pomodoroStore = inject(PomodoroStore);
  settingsStore = inject(SettingsStore);
  timerStore = inject(TimerStore);

  constructor() {
    effect(
      () => {
        if (this.timerStore.isFinished()) {
          this.pomodoroStore.switchState();
        }
      },
      { allowSignalWrites: true }
    );
  }

  onClick() {
    if (this.timerStore.state() === 'not-started') {
      this.timerStore.startTimer();
    } else if (this.timerStore.state() === 'running') {
      this.timerStore.pauseTimer();
    } else if (this.timerStore.state() === 'paused') {
      this.timerStore.resumeTimer();
    }
  }
}

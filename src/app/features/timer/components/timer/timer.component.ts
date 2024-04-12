import { Component, HostBinding, OnInit, effect, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { filter, interval, skipWhile, switchMap, take, takeUntil, takeWhile, tap, timer } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { PomodoroStore } from '../../data/pomodoro.store';
import { TimerStore } from '../../data/timer.store';
import { toObservable } from '@angular/core/rxjs-interop';



@Component({
  selector: 'timer',
  standalone: true,
  imports: [
    ButtonModule, CardModule, AsyncPipe
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
  host: { 'class': 'p-4 m-4' },
  providers: [TimerStore]
})
export class TimerComponent implements OnInit {
  timerStore = inject(TimerStore);
  pomodoroStore = inject(PomodoroStore);
  timer$ = toObservable(this.timerStore.isTimerActive).pipe(
    filter((isActive) => isActive),
    switchMap(() => interval(1000)),
    tap(() => this.timerStore.reduceTime()),
    takeWhile(() => this.timerStore.isTimerActive()),
    takeUntil(toObservable(this.timerStore.isTimeOver).pipe(
      filter((isOver) => isOver)
    ))
  )

  constructor() {
    effect(() => {
      if (this.timerStore.isTimeOver()) {
        this.timerStore.switchState('completed');
      }
    }, { allowSignalWrites: true })

    effect(() => {
      if (this.timerStore.isTimerActive()) {
        this.timer$.subscribe()
      }
    })
  }

  ngOnInit(): void {
  }

  onClick() {
    if (this.timerStore.isTimeOver()) {
      this.pomodoroStore.switchState()
    } else {
      this.timerStore.toggleTimer();
    }
  }
}

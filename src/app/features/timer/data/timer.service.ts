import { Injectable, computed, effect } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';
import { TimerData, TimerState } from '../models/timer.model';
import {
  filter,
  interval,
  map,
  skipUntil,
  skipWhile,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _state = signalState<TimerData>({
    state: 'not-started',
    currentTime: 10,
    maxTime: 60,
  });
  state = computed(() => this._state());
  timerState$ = toObservable(this._state.state);
  timerButtonLabel = computed(() => {
    switch (this._state.state()) {
      case 'not-started':
        return 'Start';
      case 'running':
        return 'Pause';
      case 'paused':
        return 'Resume';
      case 'completed':
        return 'Reset';
    }
  });

  timeLeft$ = this.timerState$.pipe(
    filter((state) => state === 'running'),
    switchMap(() =>
      interval(1000).pipe(
        takeUntil(this.timerState$.pipe(filter((state) => state !== 'running')))
      )
    ),
    tap(() => patchState(this._state, { currentTime: this._state.currentTime() - 1 })),
    map(() => this._state.currentTime()),
    tap((time) => {
      if (time <= 0) {
        patchState(this._state,{state: 'completed'})
      }
    }),
    startWith(this._state.currentTime())
  );

  constructor() {}

  updateState(newState: Partial<TimerData>) {
    patchState(this._state, newState);
  }

  toggleTimer() {
    if (
      this._state.state() === 'not-started' ||
      this._state.state() === 'paused'
    ) {
      patchState(this._state, { state: 'running' });
    } else if (this._state.state() === 'running') {
      patchState(this._state, { state: 'paused' });
    }else if(this._state.state() === 'completed'){
      patchState(this._state, { currentTime: this._state.maxTime(), state: 'running'});
    }
  }
}

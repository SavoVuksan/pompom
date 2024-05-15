import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Duration } from '../models/timer.model';
import { SettingsInitialState } from './settings.store';
import { computed } from '@angular/core';
import { Observable, interval, takeWhile, tap } from 'rxjs';

export type TimerStatus = 'not-started' | 'running' | 'paused' | 'completed';

export type TimerState = {
  currentTime: Duration;
  maxTime: Duration;
  state: TimerStatus;
  timer?: Observable<number>;
};

const initialState: TimerState = {
  currentTime: Duration.fromDuration(SettingsInitialState.focusDuration),
  maxTime: Duration.fromDuration(SettingsInitialState.focusDuration),
  state: 'not-started',
};

export const TimerStore = signalStore(
  {
    providedIn: 'root',
  },
  withState(initialState),
  withComputed((store) => ({
    stateName: computed(() => {
      switch (store.state()) {
        case 'not-started':
          return 'Start';
        case 'completed':
          return 'Start';
        case 'paused':
          return 'Resume';
        case 'running':
          return 'Pause';
      }
    }),
    isFinished: computed(() => {
      return store.state() === 'completed';
    }),
  })),
  withMethods((store) => ({
    startTimer: () => {
      patchState(store, { state: 'running' });
      const timer = interval(1000).pipe(
        tap(() => {
          if (store.state() === 'paused') {
            return;
          }
          if (store.currentTime().toSeconds() > 0) {
            patchState(store, {
              currentTime: store.currentTime().substractSeconds(1),
            });
          } else {
            patchState(store, {
              state: 'completed',
            });
          }
        }),
        takeWhile(() => !store.isFinished())
      );
      patchState(store, { timer: timer });
      timer.subscribe();
    },
    stopTimer: () => {},
    pauseTimer: () => {
      patchState(store, {
        state: 'paused',
      });
    },
    restartTimer: () => {},
    resumeTimer: () => {
      patchState(store, { state: 'running' });
    },
    setTime: (duration: Duration) => {
      patchState(store, {
        timer: undefined,
        state: 'not-started',
        currentTime: duration,
        maxTime: duration,
      });
    },
  }))
);

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
import { Observable, Subscription, interval, takeWhile, tap } from 'rxjs';

export type TimerStatus = 'not-started' | 'running' | 'paused' | 'completed';

export type TimerState = {
  currentTime: Duration;
  maxTime: Duration;
  state: TimerStatus;
  timer: Worker | undefined;
};

const initialState: TimerState = {
  currentTime: Duration.fromDuration(SettingsInitialState.focusDuration),
  maxTime: Duration.fromDuration(SettingsInitialState.focusDuration),
  state: 'not-started',
  timer: undefined,
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
      const worker = new Worker(
        new URL('../webworkers/timer.worker', import.meta.url)
      );
      worker.onmessage = ({ data }) => {
        if (data && data.remainingTime) {
          patchState(store, {
            currentTime: new Duration(
              data.remainingTime.minutes,
              data.remainingTime.seconds
            ),
          });
        } else if (data && data.timerState) {
          if (data.timerState === 'finished') {
            patchState(store, {
              state: 'completed',
            });
          }
        }
      };
      worker.postMessage(store.maxTime());
      patchState(store, { timer: worker });
    },
    stopTimer: () => {
      if (store.timer() !== undefined) {
        store.timer()?.terminate();
        patchState(store, { timer: undefined })
      }
    },
    pauseTimer: () => {
      store.timer()?.postMessage({ pause: true })
      patchState(store, {
        state: 'paused',
      });
    },
    restartTimer: () => { },
    resumeTimer: () => {
      store.timer()?.postMessage({ pause: false, minutes: store.currentTime().minutes, seconds: store.currentTime().seconds })
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

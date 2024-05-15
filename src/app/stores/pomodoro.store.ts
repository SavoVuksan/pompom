import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Duration, PomodoroData, TimerData } from '../models/timer.model';
import { computed } from '@angular/core';
import { tap, timer } from 'rxjs';
import { SettingsInitialState } from './settings.store';

const initialState: PomodoroData = {
  pomodoroCount: 0,
  state: 'focus',
  timerData: {
    currentTime: Duration.fromDuration(SettingsInitialState.focusDuration),
    maxTime: Duration.fromDuration(SettingsInitialState.focusDuration),
    state: 'not-started',
  },
  timer: undefined,
};

export const PomodoroStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ state, pomodoroCount, timerData }) => ({
    title: computed(() => (state() === 'focus' ? 'Focus' : 'Break')),
    actionButtonLabel: computed(() => {
      switch (timerData.state()) {
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
  })),
  withMethods((store) => ({
    switchToBreak(breakDuration: Duration) {
      patchState(store, {
        state: 'break',
        timerData: {
          currentTime: Duration.fromDuration(breakDuration),
          maxTime: Duration.fromDuration(breakDuration),
          state: 'not-started',
        },
      });
      patchState(store, {
        pomodoroCount: store.pomodoroCount() + 1,
      });
    },
    switchToFocus(focusDuration: Duration) {
      patchState(store, {
        state: 'focus',
        timerData: {
          currentTime: Duration.fromDuration(focusDuration),
          maxTime: Duration.fromDuration(focusDuration),
          state: 'not-started',
        },
      });
    },
    startTimer() {
      patchState(store, {
        timerData: {
          ...store.timerData(),
          state: 'running',
        },
      });
      const timerSub = timer(0, 1000)
        .pipe(
          tap(() => {
            if (store.timerData.currentTime().toSeconds() > 0) {
              patchState(store, {
                timerData: {
                  ...store.timerData(),
                  currentTime: store.timerData
                    .currentTime()
                    .substractSeconds(1),
                },
                timer: timerSub,
              });
            } else {
              patchState(store, {
                timerData: {
                  ...store.timerData(),
                  state: 'completed',
                },
              });
            }
          })
        )
        .subscribe();
    },
    pauseTimer() {
      if (store.timer && store.timer()) {
        store.timer()?.unsubscribe();
        patchState(store, {
          timerData: {
            ...store.timerData(),
            state: 'paused',
          },
        });
      }
    },
    stopTimer() {
      if (store.timer && store.timer()) {
        store.timer()?.unsubscribe();
        patchState(store, {
          timer: undefined,
        });
      }
    },
    resetTimer(duration: Duration) {
      if (store.timer && store.timer()) {
        store.timer()?.unsubscribe();
      }
      patchState(store, {
        timerData: {
          state: 'not-started',
          currentTime: duration,
          maxTime: duration,
        },
      });
    },
  }))
);

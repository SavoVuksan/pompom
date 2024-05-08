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

const initialState: PomodoroData = {
  focusDuration: new Duration(0, 10),
  longBreakDuration: new Duration(0, 5),
  longBreakInterval: 4,
  pomodoroCount: 0,
  shortBreakDuration: new Duration(0, 2),
  state: 'focus',
  timerData: {
    currentTime: new Duration(0, 10),
    maxTime: new Duration(0, 10),
    state: 'not-started',
  },
  timer: undefined,
};

export const PomodoroStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ state, pomodoroCount, longBreakInterval, timerData }) => ({
    title: computed(() => (state() === 'focus' ? 'Focus' : 'Break')),
    finishedTimers: computed(() => pomodoroCount() % (longBreakInterval() + 1)),
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
    switchToBreak() {
      if (
        store.pomodoroCount() + 1 !== 0 &&
        (store.pomodoroCount() + 1) % store.longBreakInterval() === 0
      ) {
        patchState(store, {
          state: 'break',
          timerData: {
            currentTime: Duration.fromDuration(store.longBreakDuration()),
            maxTime: Duration.fromDuration(store.longBreakDuration()),
            state: 'not-started',
          },
        });
      } else {
        patchState(store, {
          state: 'break',
          timerData: {
            currentTime: Duration.fromDuration(store.shortBreakDuration()),
            maxTime: Duration.fromDuration(store.shortBreakDuration()),
            state: 'not-started',
          },
        });
      }
      patchState(store, {
        pomodoroCount: store.pomodoroCount() + 1,
      });
    },
    switchToFocus() {
      patchState(store, {
        state: 'focus',
        timerData: {
          currentTime: Duration.fromDuration(store.focusDuration()),
          maxTime: Duration.fromDuration(store.focusDuration()),
          state: 'not-started',
        },
      });
    },
    getTimerStoreData() {
      if (store.state() === 'focus') {
        return {
          currentTime: store.focusDuration(),
          maxTime: store.focusDuration(),
          state: 'not-started',
        } satisfies TimerData;
      } else {
        return {
          currentTime: store.shortBreakDuration(),
          maxTime: store.shortBreakDuration(),
          state: 'not-started',
        } satisfies TimerData;
      }
    },
    getBreakCounterColor(counter: number) {
      if (counter < store.finishedTimers()) {
        return 'active';
      } else {
        return 'inactive';
      }
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
  }))
);

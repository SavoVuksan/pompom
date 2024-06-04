import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Duration, PomodoroData, PomodoroState } from '../models/timer.model';
import { computed, inject } from '@angular/core';
import { tap, timer } from 'rxjs';
import { SettingsInitialState, SettingsStore } from './settings.store';
import { TimerStore } from './timer.store';

const initialState: PomodoroData = {
  pomodoroCount: 0,
  state: 'focus',
};

export const PomodoroStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    title: computed(() => (store.state() === 'focus' ? 'Focus' : 'Break')),
  })),
  withMethods((store) => {
    const settingsStore = inject(SettingsStore);
    const timerStore = inject(TimerStore);

    return {
      switchState: () => {
        if (store.state() === 'focus') {
          patchState(store, {
            state: 'break',
            pomodoroCount: store.pomodoroCount() + 1,
          });
          if (
            store.pomodoroCount() !== 0 &&
            store.pomodoroCount() % settingsStore.longBreakInterval() === 0
          ) {
            timerStore.setTime(
              Duration.fromDuration(settingsStore.longBreakDuration())
            );
          } else {
            timerStore.setTime(
              Duration.fromDuration(settingsStore.shortBreakDuration())
            );
          }
        } else {
          patchState(store, {
            state: 'focus',
          });
          timerStore.setTime(
            Duration.fromDuration(settingsStore.focusDuration())
          );
        }
      },
      setState: (state: PomodoroState) => {
        patchState(store, {
          state: state,
        });
      },
    };
  })
);

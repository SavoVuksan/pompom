import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Duration } from '../models/timer.model';

export type SettingsState = {
  focusDuration: Duration;
  shortBreakDuration: Duration;
  longBreakDuration: Duration;
  longBreakInterval: number;
  isSettingsDialogOpen: boolean;
};

export const SettingsStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    focusDuration: new Duration(25, 0),
    longBreakDuration: new Duration(15, 0),
    shortBreakDuration: new Duration(5, 0),
    longBreakInterval: 4,
    isSettingsDialogOpen: false,
  } as SettingsState),
  withMethods((store) => ({
    changeSettingsDialog: (visible: boolean) => {
      patchState(store, { isSettingsDialogOpen: visible });
    },
    saveSettings: (settings: SettingsState) => {
      patchState(store, settings);
    },
  }))
);

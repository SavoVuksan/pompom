import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type AppState = {
  isSettingsDialogOpen: boolean;
};

export const AppStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({
    isSettingsDialogOpen: false,
  } as AppState),
  withMethods((store) => ({
    changeSettingsDialog: (visible: boolean) => {
      patchState(store, { isSettingsDialogOpen: visible });
    },
  }))
);

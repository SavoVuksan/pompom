import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

export type AppState = {};

export const AppStore = signalStore(
  {
    providedIn: 'root',
  },
  withState({} as AppState)
);

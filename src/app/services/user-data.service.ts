import { Injectable } from '@angular/core';
import { SettingsState } from '../stores/settings.store';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  readonly SETTINGS_KEY: string = 'settings';
  constructor() {}

  isSettingsPresent(): boolean {
    return localStorage.getItem(this.SETTINGS_KEY) !== null;
  }

  saveSettings(settings: SettingsState) {
    localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
  }

  loadSettings(): SettingsState {
    return JSON.parse(localStorage.getItem(this.SETTINGS_KEY)!);
  }
}

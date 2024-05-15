import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { SettingsState, SettingsStore } from '../../stores/settings.store';
import { getState } from '@ngrx/signals';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PomodoroStore } from '../../stores/pomodoro.store';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, DialogModule, InputNumberModule, ButtonModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  settingsStore = inject(SettingsStore);
  pomodoroStore = inject(PomodoroStore);
  settingsData: SettingsState;

  constructor() {
    this.settingsData = getState(this.settingsStore);
  }

  onVisibilityChange(visible: boolean) {
    if (!visible) {
      this.settingsStore.changeSettingsDialog(false);
    }
  }

  onSaveButtonClicked() {
    this.settingsStore.saveSettings(this.settingsData);
    this.pomodoroStore.resetTimer(this.settingsStore.focusDuration());
  }
}

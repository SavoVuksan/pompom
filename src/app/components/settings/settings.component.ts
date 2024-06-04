import { Component, inject } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { SettingsState, SettingsStore } from '../../stores/settings.store';
import { getState } from '@ngrx/signals';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PomodoroStore } from '../../stores/pomodoro.store';
import { TimerStore } from '../../stores/timer.store';
import { Duration } from '../../models/timer.model';

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
  timerStore = inject(TimerStore);
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
    this.pomodoroStore.setState('focus');
    this.timerStore.stopTimer();
    this.timerStore.setTime(
      Duration.fromDuration(this.settingsStore.focusDuration())
    );
  }
}

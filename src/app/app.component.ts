import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TimerComponent } from './components/timer/timer.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AppStore } from './stores/app.store';
import { InputNumberModule } from 'primeng/inputnumber';
import { PomodoroStore } from './stores/pomodoro.store';
import { FormsModule } from '@angular/forms';
import { SettingsState, SettingsStore } from './stores/settings.store';
import { STATE_SIGNAL } from '@ngrx/signals/src/state-signal';
import { getState } from '@ngrx/signals';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    TimerComponent,
    HeaderComponent,
    TimerComponent,
    DialogModule,
    ButtonModule,
    InputNumberModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  pomodoroStore = inject(PomodoroStore);
  settingsStore = inject(SettingsStore);
  title = 'Pom Pom';
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
    console.log(getState(this.settingsStore));
    this.settingsStore.saveSettings(this.settingsData);
    console.log(getState(this.settingsStore));
  }
}

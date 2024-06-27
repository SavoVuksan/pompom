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
import { SettingsComponent } from './components/settings/settings.component';
import { TimerState } from './stores/timer.store';
import { Duration } from './models/timer.model';

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
    SettingsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  pomodoroStore = inject(PomodoroStore);
  title = 'Pom Pom';

  constructor() {}
}

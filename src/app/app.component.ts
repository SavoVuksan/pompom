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
  appStore = inject(AppStore);
  pomodoroStore = inject(PomodoroStore);
  title = 'Pom Pom';
  focusDuration: number = 25;

  onVisibilityChange(visible: boolean) {
    if (!visible) {
      this.appStore.changeSettingsDialog(false);
    }
  }
}

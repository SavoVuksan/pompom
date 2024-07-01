import { Component, inject } from '@angular/core';
import { PomodoroStore } from '../../stores/pomodoro.store';
import { NgClass } from '@angular/common';
import { SettingsStore } from '../../stores/settings.store';

@Component({
  selector: 'break-counter',
  standalone: true,
  imports: [NgClass],
  templateUrl: './break-counter.component.html',
  styleUrl: './break-counter.component.scss',
})
export class BreakCounterComponent {
  pomodoroStore = inject(PomodoroStore);
  settingsStore = inject(SettingsStore);

  isActive(index: number) {
    let finishedTimers = 0;

    if (
      this.pomodoroStore.pomodoroCount() <=
      this.settingsStore.longBreakInterval()
    ) {
      finishedTimers = this.pomodoroStore.pomodoroCount();
    } else {
      finishedTimers =
        this.pomodoroStore.pomodoroCount() %
        this.settingsStore.longBreakInterval();
      if (finishedTimers === 0) {
        finishedTimers = this.settingsStore.longBreakInterval();
      }
    }
    return index < finishedTimers;
  }
}

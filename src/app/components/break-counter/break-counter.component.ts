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
}

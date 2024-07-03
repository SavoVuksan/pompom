import { Injectable, inject } from '@angular/core';
import { SettingsStore } from '../stores/settings.store';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  settingsStore = inject(SettingsStore);

  ringSoundPath = './assets/ringtone1.mp3';
  ringSound;
  constructor() {
    this.ringSound = new Audio(this.ringSoundPath);
    this.ringSound.load();
  }

  playSound() {
    this.ringSound.play();
  }

  setVolume(volume: number) {
    this.ringSound.volume = volume;
  }
}

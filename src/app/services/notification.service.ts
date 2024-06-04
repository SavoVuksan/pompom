import { Injectable, inject } from '@angular/core';
import { SettingsStore } from '../stores/settings.store';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  settingsStore = inject(SettingsStore);
  constructor() {}

  requestPermission() {
    if (!this.settingsStore.askedNotificationPermission()) {
      this.settingsStore.setAskedNotificationPermissions(true);
      Notification.requestPermission().then((result) => {
        if (result === 'granted') {
          this.settingsStore.setRecieveNotifications(true);
        } else {
          this.settingsStore.setRecieveNotifications(false);
        }
      });
    }
  }

  showNotification(text: string) {
    if (this.settingsStore.recieveNotifications()) {
      new Notification('PomPom', {
        body: text,
        icon: './assets/logo_light.png',
      });
    }
  }
}

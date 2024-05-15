import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppStore } from '../../stores/app.store';
import { SettingsStore } from '../../stores/settings.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  settingsStore = inject(SettingsStore);

  onSettingButtonClicked() {
    this.settingsStore.changeSettingsDialog(true);
  }
}

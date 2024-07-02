import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AppStore } from '../../stores/app.store';
import { SettingsStore } from '../../stores/settings.store';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, ToggleButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  settingsStore = inject(SettingsStore);
  themeService = inject(ThemeService);

  onSettingButtonClicked() {
    this.settingsStore.changeSettingsDialog(true);
  }

  getThemeSwitchIcon() {
    return this.themeService.selectedTheme === 'dark'
      ? 'pi pi-sun'
      : 'pi pi-moon';
  }

  onThemeSwitchClick() {
    this.themeService.changeTheme(
      this.themeService.selectedTheme === 'dark' ? 'light' : 'dark'
    );
  }
}

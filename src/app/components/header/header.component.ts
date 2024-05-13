import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AppStore } from '../../stores/app.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  appStore = inject(AppStore);

  onSettingButtonClicked() {
    this.appStore.changeSettingsDialog(true);
  }
}

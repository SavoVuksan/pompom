import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themes = ['light', 'dark'];
  document = inject(DOCUMENT);
  selectedTheme: Theme = 'light';

  constructor() {
    window.matchMedia('(prefers-color-scheme: dark)').onchange = (event) => {
      this.changeTheme(event.matches ? 'dark' : 'light');
    };
    if (this.isSystemDarkModePrefered()) {
      this.changeTheme('dark');
    } else {
      this.changeTheme('light');
    }
  }

  isSystemDarkModePrefered(): boolean {
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }
  changeTheme(theme: Theme) {
    (
      this.document.getElementById('app-theme') as HTMLLinkElement
    ).href = `${theme}.css`;
    this.selectedTheme = theme;
  }
}

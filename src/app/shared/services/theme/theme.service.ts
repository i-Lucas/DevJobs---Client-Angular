import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentIndex: number = 0;
  private currentTheme: string | undefined;

  private THEMES: string[] = [
    'saga-blue',
    'dark-purple',
    'vela-blue',
  ];

  constructor(@Inject(DOCUMENT) private document: Document) {

    const savedThemeIndex = localStorage.getItem('THM');

    if (savedThemeIndex && parseInt(savedThemeIndex) < this.THEMES.length) {

      this.currentIndex = parseInt(savedThemeIndex, 10);
      this.currentTheme = this.THEMES[parseInt(savedThemeIndex)];
      this.applyTheme(this.currentTheme);

    } else {

      this.currentTheme = this.THEMES[0];
      this.applyTheme(this.currentTheme);
    }
  }

  private applyTheme(theme: string) {

    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) themeLink.href = theme.concat('.css');

    document.body.setAttribute('class', '');
    document.body.classList.add('_theme_' + theme);
    this.saveTheme();
  }

  public switchTheme() {

    this.currentIndex = (this.currentIndex + 1) % this.THEMES.length;
    this.currentTheme = this.THEMES[this.currentIndex];
    this.applyTheme(this.currentTheme);
    this.saveTheme();
  }

  private saveTheme() {
    localStorage.setItem('THM', this.currentIndex.toString());
  }

}
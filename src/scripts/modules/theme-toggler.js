import { getThemeTogglerElements } from './get-elements';
import { getDataFromStorage, storeDataInLocalStorage } from './local-storage';

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
};

let currentTheme = getDataFromStorage('theme') || THEMES.LIGHT;

export function setTheme(theme) {
  currentTheme = theme;
  storeDataInLocalStorage('theme', theme);
  applyTheme();
}

export function toggleTheme() {
  setTheme(currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT);
}

export function applyTheme() {
  const { themeToggler, themeCircle, sunRays, sunIcon, moonIcon } =
    getThemeTogglerElements();
  const bodyEl = document.querySelector('body');

  if (currentTheme === THEMES.DARK) {
    bodyEl.classList.add('active-dark-theme');
    themeToggler.classList.add('theme-toggler-wrap--dark');
    themeToggler.classList.remove('theme-toggler-wrap--light');
    themeCircle.classList.add('theme__circle--dark');
    themeCircle.classList.remove('theme__circle--light');
    sunIcon.classList.add('circle__sun--hidden');
    moonIcon.classList.remove('circle__moon--hidden');
    sunRays.forEach(el => el.classList.add('circle__ray--hidden'));
  } else {
    bodyEl.classList.remove('active-dark-theme');
    themeToggler.classList.remove('theme-toggler-wrap--dark');
    themeToggler.classList.add('theme-toggler-wrap--light');
    themeCircle.classList.remove('theme__circle--dark');
    themeCircle.classList.add('theme__circle--light');
    sunIcon.classList.remove('circle__sun--hidden');
    moonIcon.classList.add('circle__moon--hidden');
    sunRays.forEach(el => el.classList.remove('circle__ray--hidden'));
  }
}

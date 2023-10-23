import { resetLocalStorage } from './local-storage';
import { setTheme, THEMES, applyTheme } from './theme-toggler';
import { getThemeTogglerElements } from './get-elements';

const navLinkSelector = '.nav__link';
const asideNavLinkSelector = '.nav--aside-menu .nav__link';
const officeNavLinkSelector = '.nav__list .nav__item:nth-child(2) .nav__link';
const officeAsideNavLinkSelector =
  '.nav--aside-menu  .nav__list .nav__item:nth-child(2) .nav__link';
const addServicesListItemSelector = '.add-services-list__item:nth-child(n+3)';

const indexURL = 'index.html#order-cleaning-block';
const officeURL = 'office.html#office-calc-block';
const afterRepairURL = 'after-repair.html#office-calc-block';

const flexBasisOneThird = 'calc(100% / 3)';
const flexBasisHalf = 'calc(100% / 2)';

const pages = {
  home: ['/comfort-group-cleaning/', '/comfort-group-cleaning/index.html'], 
  office: ['/comfort-group-cleaning/office.html'],
  afterRepair: ['/comfort-group-cleaning/after-repair.html'],
  calcOrder: ['/comfort-group-cleaning/calc-order.html'], 
  contacts: ['/comfort-group-cleaning/contacts.html'],
  successOr404: ['/comfort-group-cleaning/success-order.html', '/comfort-group-cleaning/404.html'],
};

const pageActions = {
  home: () => {
    setCurrentNavLinks([navLinkSelector, asideNavLinkSelector]);
    updateDynamicLinks(indexURL);
  },
  office: () => {
    setCurrentNavLinks([officeNavLinkSelector, officeAsideNavLinkSelector]);
    updateDynamicLinks(officeURL);
    setBuildingsFlexBasis(flexBasisOneThird);
    setOfficeBuildingsToggleMenu();
  },
  afterRepair: () => {
    hideBuildingsToggleMenu();
    hideSelectedItems(addServicesListItemSelector);
    updateDynamicLinks(afterRepairURL);
  },
  calcOrder: () => {
    setFooterStyle();
    setBuildingsFlexBasis(flexBasisHalf);
    addWhiteBackground();
    setCalculatorBuildingsToggleMenu();
  },
  contacts: () => {
    modifyContactPage();
    modifyMainSection();
  },
  successOr404: () => {
    modifyMainSection();
    window.addEventListener('beforeunload', function () {
      resetLocalStorage('userOrderDataObj');
    });
  },
};

document.addEventListener('DOMContentLoaded', function () {
  const currentPage = window.location.pathname;
  const bodyEl = document.querySelector('body');
  const { themeToggler } = getThemeTogglerElements();
  themeToggler.addEventListener('click', () => {
    setTheme(
      bodyEl.classList.contains('active-dark-theme')
        ? THEMES.LIGHT
        : THEMES.DARK
    );
  });
  applyTheme();

  const action = Object.keys(pageActions).find(page =>
    pages[page].includes(currentPage)
  );
  if (action) {
    pageActions[action]();
  }
});

function updateDynamicLinks(href) {
  const dynamicLinkList = document.querySelectorAll('.dynamic-link');
  [...dynamicLinkList].forEach(link => (link.href = href));
}

function hideSelectedItems(selector) {
  const items = document.querySelectorAll(selector);
  items.forEach(item => item.classList.add('isHidden'));
}

function addWhiteBackground() {
  const items = document.querySelectorAll('.block');
  items.forEach(item => item.classList.add('block--white'));
}

function setFooterStyle() {
  const footer = document.querySelector('.footer');
  footer.classList.add('footer--calc-order');
}

function setCurrentNavLinks(selectors) {
  selectors.forEach(selector => {
    const currentNavLink = document.querySelector(selector);
    if (currentNavLink) {
      currentNavLink.classList.add('nav__link--current');
    }
  });
}

function modifyContactPage() {
  const connectionSection = document.querySelector('.connection');
  connectionSection.classList.remove('no-padding-top');
  const supportBlock = document.querySelector('.connection--second-block');
  supportBlock.classList.add('block-with-image');
}

function modifyMainSection() {
  const main = document.querySelector('main');
  main.classList.add('section--dark-background');
}

export function toggleIconActiveStyle(icon) {
  icon.classList.toggle('isActive');
}

function hideBuildingsToggleMenu() {
  const title = document.querySelector('.data-order .data-order__title');
  const toggleMenu = document.querySelector('.buildings');
  toggleMenu.style.display = 'none';
  title.style.display = 'none';
}

function setOfficeBuildingsToggleMenu() {
  const buildingsElements = document.querySelectorAll('.element--office-page');
  buildingsElements.forEach(item => item.classList.remove('isHidden'));
  const calculatorBuilding = document.querySelector(
    '.element--calculator-page'
  );
  calculatorBuilding.classList.add('isHidden');
}
function setCalculatorBuildingsToggleMenu() {
  const buildingsElements = document.querySelectorAll('.element--office-page');
  buildingsElements.forEach(item => item.classList.add('isHidden'));
  const calculatorBuilding = document.querySelector(
    '.element--calculator-page'
  );
  calculatorBuilding.classList.remove('isHidden');
}

function setBuildingsFlexBasis(value) {
  const buildingsElements = document.querySelectorAll('.buildings__element');
  buildingsElements.forEach(item => (item.style.flexBasis = value));
}

export function appendElement(parent, child) {
  parent.appendChild(child);
}

export function getClosestIcon(element, iconClassName) {
  return element.parentElement.previousElementSibling.querySelector(
    `.${iconClassName}`
  );
}

export function toggleElementVisibility(el) {
  el.classList.toggle('isHidden');
}

export function handleInputBlur(inputElement, extractFunction) {
  inputElement.addEventListener('blur', e => {
    const trimmedValue = extractFunction(e.target.value);
    inputElement.value = trimmedValue;
  });
}

export function setShedulerVisibilityOptions(pickEl, sheduleEl, icon) {
  toggleElementVisibility(pickEl);
  toggleElementVisibility(sheduleEl);
  toggleIconActiveStyle(icon);
}

export function toggleClosestVisibility(wrap, blockClassName, iconClassName) {
  const sheduleInfoBlock = wrap.querySelector('.work-shedule');
  const blockElement = wrap.querySelector(`.${blockClassName}`);

  if (!sheduleInfoBlock.classList.contains('isHidden')) {
    toggleElementVisibility(sheduleInfoBlock);
    toggleElementVisibility(blockElement);
    const icon = getClosestIcon(blockElement, iconClassName);
    toggleIconActiveStyle(icon);
  }
}

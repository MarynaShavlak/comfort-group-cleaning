import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

(() => {
  const asideMenu = document.querySelector('.aside-menu');
  const openMenuBtn = document.querySelector('.open-menu-btn');
  const closeMenuBtn = document.querySelector('.close-menu-btn');

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    asideMenu.classList.toggle('is-open');

    const scrollLockMethod = !isMenuOpen ? disableBodyScroll : enableBodyScroll;
    scrollLockMethod(document.body);
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
    if (!e.matches) return;
    asideMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    enableBodyScroll(document.body);
  });
})();

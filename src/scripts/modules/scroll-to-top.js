const scrollToTopBtn = document.querySelector('.scroll-to-top-btn');

function toggleButtonVisibility() {
  if (window.scrollY >= 50) {
    scrollToTopBtn.style.display = 'flex';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', toggleButtonVisibility, { passive: true });
scrollToTopBtn.addEventListener('click', scrollToTop);

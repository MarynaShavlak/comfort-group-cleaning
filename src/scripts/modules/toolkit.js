import $ from "jquery";


$(function(){
  const toolkitsList = document.querySelectorAll('.plus-btn--toolkit');
  toolkitsList.forEach(el => {
  el.addEventListener('mouseenter', () => {
    toggleToolkitDescVisibility(el);
  });
  el.addEventListener('mouseleave', () => {
    toggleToolkitDescVisibility(el);
  });
});

function toggleToolkitDescVisibility(el) {
  const parentItem = el.closest('.toolkit__wrapper');
  const descItem = parentItem.querySelector(':first-child');
  descItem.classList.toggle('is-shown');
}
})

  const swiper = new Swiper(".swiper-container", {
    effect: "cube",
    cubeEffect: {
      slideShadows: false,
    },
    speed: 1000,
    grabCursor: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        const roomTexts = ["Кухня", "Кімнати", "Санвузол"];
        return `<li class="${className}">${roomTexts[index]}</li>`;
      },
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: {
      invert: true,
    },
  });

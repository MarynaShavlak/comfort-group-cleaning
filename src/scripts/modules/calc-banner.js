import $ from "jquery";
import gsap from "gsap";

const menu = [
  'Будинки та квартири',
  'Комерційні приміщення',
  'Після ремонту',
];
const swiper = initializeSwiper();
const slideList = document.querySelectorAll('.swiper-slide');
  [...slideList].forEach(item => item.setAttribute('role', 'Слайд'));


function initializeSwiper() {
  const swiper = new Swiper('.swiper', {
    speed: 1000,
    spaceBetween: 0,
    initialSlide: 2,
    touchRatio: 0,
    effect: 'fade',
      autoplay: {
    delay: 2000,
    disableOnInteraction: false
  },
    pagination: {
      clickable: true,
      el: '.swiper-pagination',
      renderBullet: renderBullet,
    },
    on: {
      slideChangeTransitionStart: handleSlideChangeStart,
      slideChange: handleSlideChange,
    },
  });

  $('.swiper--calc-banner .swiper-pagination .swiper-pagination-bullet:first-child').trigger('click');
  return swiper;
}

function renderBullet(index, className) {
  return '<span class="' + className + '">' + (menu[index]) + '</span>';
}

function handleSlideChangeStart() {
  $('.swiper-slide.swiper-slide-active .calc-banner__title').css('left', '0px');
  $('.swiper-slide.swiper-slide-active .calc-banner__images-wrapper').css('left', '50px');
}

function handleSlideChange() {
  $('.swiper-slide.swiper-slide-active .calc-banner__title').css('left', '100%');
  $('.swiper-slide.swiper-slide-active .calc-banner__images-wrapper').css('left', '100%');
}

function handleMouseMove(event) {
  $('.calc-banner__image').each(function () {
    const layers = $(this).data('value');
    const x = ($(window).innerWidth() - event.pageX * layers) / 100;
    const y = ($(window).innerHeight() - event.pageY * layers) / 100;
    gsap.to(this, {
      duration: 0.3,
      marginLeft: x + 'px', 
      marginTop: y + 'px', 
      ease: 'power2.out', 
    });
  });
}

$('.swiper--calc-banner .swiper-slide').on('mousemove', handleMouseMove);






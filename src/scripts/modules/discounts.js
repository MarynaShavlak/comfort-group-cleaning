import { seasonDiscountInfo } from "./discounts-data";
import { canUseWebP, getImageName,  copyToClipboard, getImageUrl} from "./utils";
import { createGlass } from "./create-discount-glass";

const externalSliderContainer = document.querySelector('.swiper-container-parent'); 
const externalSwiperWrapper = createExternalSwiperWrap();
externalSliderContainer.appendChild(externalSwiperWrapper);
const initialExternalSlide = getInitialExternalSlide();
const externalSwiper = initializeExternalSwiper(initialExternalSlide);

const innerSliderContainers = document.querySelectorAll('.swiper-container-nested');
innerSliderContainers.forEach(initializeInnerSwiper);
externalSliderContainer.addEventListener('click', handleCopyPromo);
const slideList = document.querySelectorAll('.swiper-slide');
  [...slideList].forEach(item => item.setAttribute('role', 'Слайд'));

function initializeExternalSwiper(initialSlide) {
  return new Swiper('.swiper-container-parent', {
    spaceBetween: 20,
    initialSlide: initialSlide,
    effect: 'fade',
    slidesPerView: 1,
    speed: 1500,
    
    
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: {
      invert: true,
    },
    pagination: {
      el: ".swiper-pagination-parent",
      clickable: true,
      renderBullet: renderExternalBullet,
    }
  });
}

function initializeInnerSwiper(container) {
  const slides = container.children[0].children;
  const array = Array.from(slides).map((i) => i.getAttribute('data-name'));
  const innerSwiper = new Swiper(container, {
    direction: "vertical",
    effect: 'slider',
    slidesPerView: 1,
    speed: 1000,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: {
      invert: true,
    },
    nested: true,
    pagination: {
      el: ".swiper-pagination-nested",
      clickable: true,
      renderBullet: (index, className) => {
        const namePag = array[index];
        return '<span class="' + className + '">' + namePag + '</span>';
      },
    }
  });
}

function getInitialExternalSlide() {
  const currentSeason = getSeason();
  return ['spring', 'summer', 'autumn', 'winter'].indexOf(currentSeason) + 1 || 0;
}

function createExternalSlide(season) {
  const slide = document.createElement('li');
  slide.className = `swiper-slide swiper-slide--${season}`;

  const swiperContainer = createInnerSliderContainer(season);
  slide.appendChild(swiperContainer);

  return slide;
}

function createExternalSwiperWrap() {
  const swiperWrapper = document.createElement('ul');
  swiperWrapper.className = 'swiper-wrapper discounts__swiper-wrapper';

  const seasons = Object.keys(seasonDiscountInfo);

  seasons.forEach((season) => {
    const seasonSlide = createExternalSlide(season);
    swiperWrapper.appendChild(seasonSlide);
  });

  return swiperWrapper;
}

function renderExternalBullet(index, className) {
  const seasons = Object.keys(seasonDiscountInfo);
  const season = seasons[index];
  const classSpan = `discount__pagination-btn btn--${season}`;
  const svg = createExternalPagIcon(season);
  return '<span class="' + className + " " + classSpan + '">' + svg.outerHTML + '</span>';
}

function createExternalPagIcon(season) {
  const svg = document.createElement('svg');
  svg.className = 'discount__pagination-icon';
  svg.width = 40;
  svg.height = 40;

  const use = document.createElement('use');
  use.setAttribute('href', `images/sprite.svg#icon-${season}`);

  svg.appendChild(use);
  return svg;
}

function createInnerSwiperSlide(season, imageIndex) {
  const { image, dataName, description, terms, promo } = seasonDiscountInfo[season][imageIndex];
  const imageUrl = getImageUrl('discounts', getImageName(image));
  const slide = createInnerSlideBlock(season, dataName, imageUrl);
  slide.appendChild(createGlass(description, terms, promo));
  return slide;
}

function createInnerSlideBlock(season, dataName, imageUrl) {
  const slide = document.createElement('div');
  slide.className = `swiper-slide discounts__slide discounts__slide--${season}`;
  slide.setAttribute('data-name', dataName);

  if (canUseWebP()) {
    slide.style.backgroundImage = imageUrl;
  } else {
    slide.style.cssText = `background-image: ${imageUrl}`;
  }

  return slide;
}

function createInnerSliderContainer(season) {
  const container = document.createElement('div');
  container.className = 'swiper-container-nested';
  
  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'swiper-wrapper discounts__inner-swiper-wrapper';
  seasonDiscountInfo[season].forEach((_, i) => {
    innerWrapper.appendChild(createInnerSwiperSlide(season, i));
  });
  container.appendChild(innerWrapper);
  const pagination = document.createElement('div');
  pagination.className = 'swiper-pagination swiper-pagination-nested';
  container.appendChild(pagination);
  return container;
}

function getSeason() {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const seasonStartMonths = [2, 5, 8, 11];
  const seasonNames = ['spring', 'summer', 'autumn', 'winter'];

  for (let i = 0; i < seasonStartMonths.length; i++) {
    if (currentMonth >= seasonStartMonths[i] && currentMonth < seasonStartMonths[i + 1]) {
      return seasonNames[i];
    }
  }

}



function handleCopyPromo(e) {
const clickedEl = e.target;
const isCopyIcon = clickedEl.classList.contains('promo__copy-icon');
if(isCopyIcon) {
  const textEl  = clickedEl.previousElementSibling;
  const text = textEl.textContent;
  copyToClipboard(text);
  textEl.classList.add('isCopied');
  setTimeout(() => {
    textEl.classList.remove('isCopied');
  }, 1000);
} 

}
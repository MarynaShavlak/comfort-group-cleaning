import { seasonDiscountInfo } from "./discounts-data";

const parentElement = document.querySelector('.swiper-container-parent'); 
const swiperWrapper = createSwiperWrapper();
parentElement.appendChild(swiperWrapper);
const currentSeason = getSeason();
const initialSlide = getInitialSlide();
const discountsSwiper = createDiscountsSwiper(initialSlide);

const nestedContainers = document.querySelectorAll('.swiper-container-nested');
nestedContainers.forEach((container, index) => {
  createInnerSwiper(container, index);
});

function createDiscountsSwiper(initialSlide) {
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
      renderBullet: renderDiscountBullet,
    }
  });
}

function createInnerSwiper(container, index) {
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
function getInitialSlide() {
  const currentSeason = getSeason();
  return currentSeason === 'spring' ? 1 :
         currentSeason === 'summer' ? 2 :
         currentSeason === 'autumn' ? 3 : 0;
}

function createSwiperSlide(season, imageIndex) {
  const { image, dataName, description, terms, promo } = seasonDiscountInfo[season][imageIndex];
  const slide = document.createElement('div');
  slide.className = `swiper-slide discounts__slide discounts__slide--${season}`;
  slide.setAttribute('data-name', dataName);
  slide.style.backgroundImage = `url('../images/discounts/${image}')`;
  const glass = document.createElement('div');
  glass.className = 'swiper-slide__glass';
  const descriptionElem = createGlassDescriptions(description, 'glass__descr');
  const termsElem = createGlassTerms(terms, 'glass__terms');
  const promoElem = createGlassElement(promo, 'glass__promo');
  glass.appendChild(descriptionElem);
  glass.appendChild(termsElem);
  glass.appendChild(promoElem);
  slide.appendChild(glass);
  return slide;
}

function createSwiperContainer(season) {
  const container = document.createElement('div');
  container.className = 'swiper-container-nested';
  
  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'swiper-wrapper discounts__inner-swiper-wrapper';

  for (let i = 0; i < seasonDiscountInfo[season].length; i++) {
    const slide = createSwiperSlide(season, i);
    innerWrapper.appendChild(slide);
  }

  container.appendChild(innerWrapper);

  const pagination = document.createElement('div');
  pagination.className = 'swiper-pagination swiper-pagination-nested';
  container.appendChild(pagination);
  return container;
}

function createSeasonSlide(season) {
  const slide = document.createElement('li');
  slide.className = `swiper-slide swiper-slide--${season}`;

  const swiperContainer = createSwiperContainer(season);
  slide.appendChild(swiperContainer);

  return slide;
}

function createSwiperWrapper() {
  const swiperWrapper = document.createElement('ul');
  swiperWrapper.className = 'swiper-wrapper discounts__swiper-wrapper';

  const seasons = Object.keys(seasonDiscountInfo);

  seasons.forEach((season) => {
    const seasonSlide = createSeasonSlide(season);
    swiperWrapper.appendChild(seasonSlide);
  });

  return swiperWrapper;
}

function renderDiscountBullet(index, className) {
  const seasons = Object.keys(seasonDiscountInfo);
  const season = seasons[index];
  const classSpan = `discount__pagination-btn btn--${season}`;
  const svg = createSvgIcon(season);
  return '<span class="' + className + " " + classSpan + '">' + svg.outerHTML + '</span>';
}

function createSvgIcon(season) {
  const svg = document.createElement('svg');
  svg.className = 'discount__pagination-icon';
  svg.width = 40;
  svg.height = 40;

  const use = document.createElement('use');
  use.setAttribute('href', `images/sprite.svg#icon-${season}`);

  svg.appendChild(use);
  return svg;
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

function createGlassElement(content, className) {
  const elem = document.createElement('p');
  elem.className = className;
  elem.innerHTML = content;
  return elem;
}
function createGlassTerms(content, className) {
  const elem = document.createElement('p');
  elem.className = className;
  elem.innerHTML = highlightTermsInString(content);
  return elem;
}

function createGlassDescriptions(content, className) {
  const container = document.createElement('div');
  container.className = className;
  const sentences = splitContent(content);

  sentences.forEach(sentence => {
    const elem = document.createElement('p');
    elem.innerHTML = highlightDiscountInString(sentence);
    container.appendChild(elem);
  });

  return container;
}

function splitContent(inputString) {
  const sentences = inputString.match(/[^.!?]+[.!?]+/g);

  if (sentences && sentences.length >= 1) {
    return sentences;
  } else {
    return [inputString];
  }
}

function highlightDiscountInString(sentence) {
  const regex = /(\d+%)/g;
  const modifiedSentence = sentence.replace(
    regex,
    '<span class="glass__accent">$1</span>'
  );

  return modifiedSentence;
}

function highlightTermsInString(inputString) {
  const regex = /з (.*?) по (.*?) (\d{4} року)/g;
  const highlightedString = inputString.replace(
    regex,
    function (match, term1, term2, year) {
      return `з <span class="glass__accent--term">${term1}</span> по <span class="glass__accent--term">${term2} ${year}</span> `;
    }
  );

  return highlightedString;
}


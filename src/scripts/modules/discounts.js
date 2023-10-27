import { seasonImages } from "./discounts-data";

const parentElement = document.querySelector('.swiper-container-parent'); 
const swiperWrapper = createSwiperWrapper();
parentElement.appendChild(swiperWrapper);

const discountsSwiper = new Swiper('.swiper-container-parent', {
  spaceBetween: 20,
  effect: 'slider',
  slidesPerView: 1,
  pagination: {
    el: ".swiper-pagination-parent",
    clickable: true,
    // renderBullet: function(index, className) {
    //   return '<span class="' + className + '">' + (index + 1) + "</span>";
    // }
    renderBullet: function (index, className) {
      const seasons = Object.keys(seasonImages);
      const season = seasons[index];
       const classSpan = `discount__pagination-btn btn--${season}`;
      const svg = document.createElement('svg');
      svg.className = 'discount__pagination-icon';
      svg.width = 40;
      svg.height = 40;
    
      const use = document.createElement('use');
      use.setAttribute('href', `images/sprite.svg#icon-${season}`);
      
      svg.appendChild(use);
   
      return '<span class="' + className + " " + classSpan + '">' + svg.outerHTML + '</span>';
      
    }
    
  }
});

const nestedContainers = document.querySelectorAll('.swiper-container-nested');
nestedContainers.forEach((container, index) => {
  createInnerSwiper(container, index);
});

function createSwiperSlide(season, imageIndex) {
  const { image, dataName } = seasonImages[season][imageIndex];
  const slide = document.createElement('div');
  slide.className = `swiper-slide discounts__slide discounts__slide--${season}`;
  slide.setAttribute('data-name', dataName);
  slide.style.backgroundImage = `url('../images/discounts/${image}')`;
  return slide;
}

function createSwiperContainer(season) {
  const container = document.createElement('div');
  container.className = 'swiper-container-nested';
  
  const innerWrapper = document.createElement('div');
  innerWrapper.className = 'swiper-wrapper discounts__inner-swiper-wrapper';

  for (let i = 0; i < seasonImages[season].length; i++) {
    const slide = createSwiperSlide(season, i);
    innerWrapper.appendChild(slide);
  }

  container.appendChild(innerWrapper);

  const pagination = document.createElement('div');
  pagination.className = 'swiper-pagination swiper-pagination-nested';
  container.appendChild(pagination);
  // const paginationButton = createPaginationButton(season);
  // container.appendChild(paginationButton);
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

  const seasons = Object.keys(seasonImages);

  seasons.forEach((season) => {
    const seasonSlide = createSeasonSlide(season);
    swiperWrapper.appendChild(seasonSlide);
  });

  return swiperWrapper;
}

function createInnerSwiper(container, index) {
  const slides = container.children[0].children;
  const array = Array.from(slides).map((i) => i.getAttribute('data-name'));
  const innerSwiper = new Swiper(container, {
      // spaceBetween: 20,
      direction: "vertical",
      effect: 'slider',
      slidesPerView: 1,
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


function createPaginationButton(season) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `discount__pagination-btn btn--${season}`;
  button.setAttribute('aria-label', `перейти до акційних пропозицій ${season}`);
  
  const svg = document.createElement('svg');
  svg.className = 'discount__pagination-icon';
  svg.width = 40;
  svg.height = 40;

  const use = document.createElement('use');
  use.setAttribute('href', `images/sprite.svg#icon-${season}`);
  
  svg.appendChild(use);
  button.appendChild(svg);
  
  return button;
}


//   // swiperNested.on('scroll', function (swiper) {
//   //   /* On last slide of the nested slider go to next "parent" slide */
//   //   console.log(this.realIndex)
//   //   // this.realIndex + 1 (add 1 beacuse it is zero based index) //
//   //   if(this.slides.length == this.realIndex + 1){
//   //     console.log("last inner slide");
//   //   }
//   // });

// });

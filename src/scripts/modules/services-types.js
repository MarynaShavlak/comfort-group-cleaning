import { servicesItemsData, drycleanData 
 } from "./services-types-data";
 import { canUseWebP, getImageName,  copyToClipboard, getImageUrl} from "./utils";

 const servicesContainer = document.querySelector('.block-wrapper.services-types__list');
 const drycleanContainer = document.querySelector('.dry-clean__list');
 createServiceItemsList();
 createDrycleanItemsList();
 const drycleanSwiper = initializeDrycleanSwiper();
 const slideList = document.querySelectorAll('.swiper-slide');
  [...slideList].forEach(item => item.setAttribute('role', 'Слайд'));

 drycleanSliderEventHandlers(drycleanSwiper);
 function initializeDrycleanSwiper() {
   const swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    loopedSlides: 2,
    watchOverflow: true,
    slideToClickedSlide: true,
    coverflowEffect: {
      rotate: 0,
      stretch:0, 
      depth: 100,
      modifier:2, 
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    mousewheel: {
      invert: true,
    },
    autoplay: {
      delay: 1500,
      disabledOnInteraction: true,
    },
   
  });
  return swiper;
 }
 




function createServiceItemsList() {
  servicesItemsData.forEach(({ imageName, imageText }) => {
    const listItem = createServiceItem(imageName, imageText);
    servicesContainer.appendChild(listItem);
  });
}

function createDrycleanItemsList() {
  drycleanData.forEach(({ name, cost, duration, file }) => {
    const listItem = createDrycleanItem({ name, cost, duration, file });
    drycleanContainer.appendChild(listItem);
  });
}

function createServiceItem(imageName, text) {
  const listItem = document.createElement('li');
  listItem.className = 'buildings__item services-types__item';
  const imgSrcPath = `images/services/${imageName}`;
  listItem.innerHTML = `
    <div class="buildings__icon-wrap">
      <picture class="services__image">
        <source srcset="${imgSrcPath.replace('png', 'webp')} 1x, ${imgSrcPath .replace('@1x', '@2x').replace('png', 'webp')} 2x" type="image/webp">
        <source srcset="${imgSrcPath} 1x, ${imgSrcPath.replace('@1x', '@2x')} 2x" type="image/png">
        <img width="100" height="100" src="${imgSrcPath}" alt="Картинка послуги">
      </picture>
    </div>
    <h3 class="block__title buildings__text services-types__text">${text}</h3>
  `;

  return listItem;
}

function createDrycleanItem({name, cost, duration, file}) {
  const li = document.createElement('li');
  li.className = 'dry-clean__item swiper-slide';
  const imageUrl = getImageUrl('services/dryclean', getImageName(file));
  if (canUseWebP()) {
    li.style.backgroundImage = imageUrl;
  } else {
   li.style.cssText = `background-image: ${imageUrl}`;
  }

  const title = document.createElement('h3');
  title.className = 'dry-clean__title';
  title.textContent = name;

  const costEl = document.createElement('p');
  costEl.className = 'dry-clean__cost';
  costEl.textContent = `~${cost}`;

  const durationEl = document.createElement('p');
  durationEl.className = 'dry-clean__duration';
  durationEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${duration}`;

  li.appendChild(title);
  li.appendChild(costEl);
  li.appendChild(durationEl);
  return li;
}

function drycleanSliderEventHandlers(gallery) {
  const drycleanSlider = document.querySelector('.dry-clean__swiper');
  drycleanSlider.addEventListener('mouseleave', () => {
    gallery.params.autoplay.disableOnInteraction = false;
    gallery.params.autoplay.delay = 1500;
    gallery.autoplay.start();
  });

  drycleanSlider.addEventListener('mouseenter', () => {
    gallery.autoplay.stop();
  });
}
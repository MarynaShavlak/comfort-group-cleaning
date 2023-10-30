import { servicesItemsData
 } from "./services-types-data";

 const servicesContainer = document.querySelector('.block-wrapper.services-types__list');

 servicesItemsData.forEach(({imageName,imageText}) => {
  const listItem = createServiceItem(imageName,imageText);
  servicesContainer.appendChild(listItem);
});


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

const swiper = new Swiper('.swiper', {
  effect: 'coverflow',
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 5,
  slidesPerGroup:1,
  coverflowEffect: {
    rotate: 20,
    stretch:50, 
    // depth: 200,
    modifier:1, 
    slidesShadows: true,
  },
  speed: 400,
  spaceBetween: 20,
  initialSlide: 0,
  loop: true,
  // autoplay: {
  //   delay: 2000,
  //   disabledOnInteraction: true,
  // }

  // spaceBetween: 100,
})
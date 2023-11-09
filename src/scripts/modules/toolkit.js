import { kitchenSchemaData, roomSchemaData, bathSchemaData } from "./rooms-shema-data";
const roomTexts = ["Кухня", "Кімнати", "Санвузол"];
const schemaTypes = ['.schema--kitchen', '.schema--room', '.schema--bath'];
const container = document.querySelector(".swiper-wrapper");

schemaTypes.forEach((type, index) => {
  window.addEventListener('resize', () => updateSchemasOnResize(getSchemaData(index), type));
  initializeSchema(getSchemaData(index), type);
}); 

 const swiperInitialized = initializeSwiper();
 container.addEventListener("mouseover", showDescriptionOnHover);
container.addEventListener("mouseout", hideDescriptionOnHoverOut);
const slideList = document.querySelectorAll('.swiper-slide');
  [...slideList].forEach(item => item.setAttribute('role', 'Слайд'));

  function initializeSwiper() {
    return new Swiper(".swiper-container", {
      effect: "cube",
      cubeEffect: {
        slideShadows: false,
      },
      speed: 1000,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination-rooms',
        clickable: true,
        renderBullet: (index, className) => {
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
  }

  function getSchemaData(index) {
    return index === 0 ? kitchenSchemaData : (index === 1 ? roomSchemaData : bathSchemaData);
  }

  function showDescriptionOnHover(event) {
    const btn = getButtonFromHoveredItem(event.target);
    if (btn) {
      toggleDescriptionVisibility(btn, true);
    }
  }
  
  function hideDescriptionOnHoverOut(event) {
    const btn = getButtonFromHoveredItem(event.target);
    if (btn) {
      toggleDescriptionVisibility(btn, false);
    }
  }


  function getButtonFromHoveredItem(hoveredItem) {
    if (hoveredItem.classList.contains('plus-btn')) {
      return hoveredItem;
    } else if (hoveredItem.tagName === 'use' || hoveredItem.tagName === 'svg') {
      return hoveredItem.closest('.toolkit__btn');
    } else {
      return null;
    }
  }

  function toggleDescriptionVisibility(btn, show) {
    const desc = btn.closest('.toolkit__wrapper').querySelector('.toolkit__desc');
    desc.classList.toggle('is-shown', show);
  }

  function createSchemaElement(data, index) {
    const schema = document.createElement('div');
    schema.classList.add(`toolkit__wrapper`);
    schema.classList.add(`wrapper-${index + 1}`);
    schema.setAttribute('data-schema-id', `schema-${index + 1}`);
  
    const span = document.createElement('span');
    span.classList.add('toolkit__desc');
    if(data.reverse) {
      span.classList.add('toolkit__desc--reverse');
    }
    span.textContent = data.description;

    const btnClass = data.reverse ? "plus-btn plus-btn--toolkit toolkit__btn toolkit__btn--reverse" : "plus-btn plus-btn--toolkit toolkit__btn";
    const buttonHTML = `
    <button type="button" class="${btnClass}" aria-label="показати повідомлення про вид робіт, що надається">
      <svg class="toolkit__icon" width="18" height="18">
        <use href="images/sprite.svg#icon-plus"></use>
      </svg>
    </button>
  `;  
  schema.appendChild(span);
  schema.insertAdjacentHTML('beforeend', buttonHTML);
  
  const windowWidth = window.innerWidth;
  const styleToApply =
    windowWidth >= 1440 ? data.styles.mediaQuery1440 :
    windowWidth >= 768 ? data.styles.mediaQuery768 :
    data.styles.base;
  
  Object.assign(schema.style, styleToApply);
  
    return schema;
  }
  
  function initializeSchema(shemaData, selector) {
    const room = document.querySelector(selector);
    shemaData.forEach((data, index) => {
      const schema = createSchemaElement(data, index);
      room.appendChild(schema);
    });
  }
  
  function updateSchemasOnResize(data, selector) {
    const schemaElements = document.querySelectorAll(`${selector} .toolkit__wrapper`);
    schemaElements.forEach((schema) => {
      const index = schema.classList[1].replace('wrapper-', '') - 1;
      const schemaData = data[index];
      applySchemaStyles(schema, schemaData.styles);
    });
  }
  
  function applySchemaStyles(schema, styles) {
    const windowWidth = window.innerWidth;
    const styleToApply =
      windowWidth >= 1440 ? styles.mediaQuery1440 :
      windowWidth >= 768 ? styles.mediaQuery768 :
      styles.base;
  
    Object.assign(schema.style, styleToApply);
  }

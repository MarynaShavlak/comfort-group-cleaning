import VanillaTilt from 'vanilla-tilt';
import Masonry from "masonry-layout";
import { comparisonImagesData } from './before-after-data';

const grid = document.querySelector('.comparison__slider-list');
const buttonContainer = document.querySelector(".comparison__categories-list");
const gutterSize = 20;

let chosenCategory = 'Всі';
createCategoryItems();

createComparisonSliderList();
buttonContainer.addEventListener('click', handleCategory )
initializeMasonry();
  
  
document.addEventListener('DOMContentLoaded', () => {
  initializeSlider();
});

  function initializeMasonry() {
    const masonry   = new Masonry(grid, {
      itemSelector: '.comparison-slider',
      gutter: gutterSize,
      
    });
  }

  function initializeSlider() {
    const sliders = document.querySelectorAll(".comparison-slider");
    sliders.forEach((slider) => {
      const sliderImgWrapper = slider.querySelector(".comparison-slider__wrapper");
      const sliderHandle = slider.querySelector(".comparison-slider__handle");
      let isSliderLocked = false;
    
      function sliderMouseMove(event) {
        if (isSliderLocked) return;
        const sliderLeftX = slider.getBoundingClientRect().left;
        const sliderWidth = slider.clientWidth;
        const sliderHandleWidth = sliderHandle.clientWidth;
        let mouseX = calculateNormalizedMouseX(event, sliderLeftX, sliderWidth);
        setSliderImgWrapperWidth(mouseX);
        setSliderHandleLeftPosition(mouseX, sliderHandleWidth);
      }
    
      function calculateNormalizedMouseX(event, sliderLeftX, sliderWidth) {
        let mouseX = (event.clientX || event.touches[0].clientX) - sliderLeftX;
        mouseX = Math.max(0, Math.min(mouseX, sliderWidth));
        return mouseX / sliderWidth;
      }
    
      function setSliderImgWrapperWidth(normalizedMouseX) {
        const sliderImgWrapperWidth = ((1 - normalizedMouseX) * 100).toFixed(4);
        sliderImgWrapper.style.width = `${sliderImgWrapperWidth}%`;
      }
    
      function setSliderHandleLeftPosition(normalizedMouseX, sliderHandleWidth) {
        const handleLeft = `calc(${(normalizedMouseX * 100).toFixed(4)}% - ${sliderHandleWidth / 2}px)`;
        sliderHandle.style.left = handleLeft;
      }
    
      function sliderMouseDown(event) {
        if (isSliderLocked) isSliderLocked = false;
        sliderMouseMove(event);
      }
    
    

      function sliderMouseUp() {
        isSliderLocked = true; 
      }
      
      function sliderMouseLeave() {
        isSliderLocked = false; 
      }
    
      slider.addEventListener("mousemove", sliderMouseMove);
      slider.addEventListener("touchmove", sliderMouseMove);
      slider.addEventListener("mousedown", sliderMouseDown);
      slider.addEventListener("touchstart", sliderMouseDown);
      slider.addEventListener("mouseup", sliderMouseUp);
      slider.addEventListener("touchend", sliderMouseUp);
      slider.addEventListener("mouseleave", sliderMouseLeave);
    
      VanillaTilt.init(slider, {
        max: 5,
        speed: 800,
        scale: 1.02
      });
    });
    
  }

  function createComparisonSliderList() {
    const container = document.querySelector('.comparison__slider-list');
    comparisonImagesData.forEach(({ beforeName, afterName, desc, categories }) => {
      const listItem = createComparisonSliderItem({beforeName, afterName, desc, categories});
      listItem.classList.add('comparison-slider');
      container.appendChild(listItem);
    });
  }

  function createComparisonSliderItem({beforeName, afterName, desc, categories}) {
      const listItem = document.createElement('li');
      const categoriesString = categories.join(', ');
      listItem.setAttribute("data-categories", categoriesString);
    
      const beforeImage = createComparisonImage(beforeName, desc, 'До прибирання');
      const afterImage = createComparisonImage(afterName, desc, 'Після прибирання');
      
      const beforeLabel = createLabel('До', 'label--before');
      const afterLabel = createLabel('Після', 'label--after');
      const handle = createHandle();
      
      listItem.appendChild(beforeImage);
      const wrapper = createComparisonWrapper(afterImage);
      listItem.appendChild(wrapper);
      listItem.appendChild(beforeLabel);
      listItem.appendChild(afterLabel);
      listItem.appendChild(handle);
      
      return listItem;
  }

  function createComparisonWrapper(afterImage) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('comparison-slider__wrapper');
    wrapper.appendChild(afterImage);
    
    return wrapper;
  }

  function createComparisonImage(imageName, altText) {
    const webpSrcset = `images/before-after/${imageName}.webp`;
    const jpgSrcset =`images/before-after/${imageName}.jpg`;
    const picture = document.createElement('picture');
    picture.className = 'comparison-slider__image'
    const webpSource = document.createElement('source');
    webpSource.setAttribute('srcset', webpSrcset);
    webpSource.setAttribute('type', 'image/webp');
    const jpgSource = document.createElement('source');
    jpgSource.setAttribute('srcset', jpgSrcset);
    jpgSource.setAttribute('type', 'image/jpg');
    const img = document.createElement('img');
    img.setAttribute('src', jpgSrcset);
    img.setAttribute('alt', altText);

    picture.appendChild(webpSource);
    picture.appendChild(jpgSource);
    picture.appendChild(img);

    return picture;
  }

  function createLabel(text, className) {
    const label = document.createElement('span');
    label.textContent = text;
    label.classList.add('comparison-slider__label', className);
    return label;
  }

  function createHandle() {
    const handle = document.createElement('div');
    handle.classList.add('comparison-slider__handle');
    const line1 = document.createElement('div');
    line1.classList.add('handle__line');
    const circle = document.createElement('div');
    circle.classList.add('handle__circle');
    const chevronLeft = document.createElement('i');
    chevronLeft.classList.add('fas', 'fa-chevron-left');
    const chevronRight = document.createElement('i');
    chevronRight.classList.add('fas', 'fa-chevron-right');
    const line2 = document.createElement('div');
    line2.classList.add('handle__line');
    circle.appendChild(chevronLeft);
    circle.appendChild(chevronRight);
    handle.appendChild(line1);
    handle.appendChild(circle);
    handle.appendChild(line2);

    return handle;
  }

  function createCategoryItems() {
    createCategoryItem("Всі", 'Показати всі категорії');
    const uniqueCategories = new Set();
    comparisonImagesData.forEach(item => {
      item.categories.forEach(category => {
        uniqueCategories.add(category);
      });
    });
    const allCategories = Array.from(uniqueCategories);
    allCategories.forEach(category => {
      const ariaLabel = `Фільтрувати за категорією ${category}`;
      createCategoryItem(category, ariaLabel);
    });
   

  }

  function createCategoryItem(text, ariaLabel) {
    const li = document.createElement("li");
      li.className = 'category__item';
    const button = document.createElement("button");
    button.textContent = text;
    button.className = 'category__button';
    if (text==='Всі') {
      button.classList.add('category__button--active');
    } 
    
    button.setAttribute("aria-label", ariaLabel);
    li.appendChild(button);
    buttonContainer.appendChild(li);
  }

  function handleCategory(e) {
    if (!e.target.classList.contains('category__button')) {
      return;
    }

    toggleCategory(e.target, buttonContainer.querySelectorAll('.category__button'));

    const category = e.target.textContent;
    chosenCategory = category;

    const pictureList = grid.querySelectorAll('.comparison-slider');
    pictureList.forEach(item => {
      const categories = item.dataset.categories.split(', ');
      const hasChosenCategory = chosenCategory === 'Всі' || categories.includes(chosenCategory);
      item.classList.toggle('filtered', !hasChosenCategory);
    });

    setTimeout(() => {
      new Masonry(grid, {
        itemSelector: '.comparison-slider:not(.filtered)',
        gutter: gutterSize,
      });
    }, 300);
  }

  function toggleCategory(btn, allBtnList) {
    allBtnList.forEach(btn => btn.classList.remove('category__button--active'))
    btn.classList.add('category__button--active')
  }



const margin = 10; // Minimum distance between items
const containerWidth = buttonContainer.clientWidth;
console.log('containerWidth : ', containerWidth );

function arrangeItems() {
  const buttons = buttonContainer.querySelectorAll(".category__item");
  let widthArray =[];

  buttons.forEach(btn => {
    const btnWidth = btn.clientWidth;
    const btnText = btn.querySelector('button').textContent;
    console.log('btnText: ', btnText);
    const obj = {
      name: btnText,
      width: btnWidth,
    }
    widthArray.push(obj );
    console.log('btnWidth: ', btnWidth);
  })
  console.log('widthArray: ', widthArray);
}

arrangeItems();



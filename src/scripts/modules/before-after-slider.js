
import Masonry from "masonry-layout";
import { comparisonImagesData } from './before-after-data';
import { createComparisonSliderItem } from './generate-comparison-slider';
import { initializeSlider } from "./initialize-comparison-slider";

const grid = document.querySelector('.comparison__slider-list');
const buttonContainer = document.querySelector(".comparison__categories-list");
const animatedBtnWrap = document.querySelector('.animated-btn-wrap');
const gutterSize = 20;
let chosenCategory = 'Всі';
let itemsPerPage = 6; 
let displayedItems = 0; 
initializeBeforeAfterBlock();

  function initializeBeforeAfterBlock() {
    createCategoryItemsList();
    createInitialComparisonSliderList();
    initializeMasonry();
    buttonContainer.addEventListener('click', handleCategory);
    document.addEventListener('DOMContentLoaded', () => initializeSlider());
    animatedBtnWrap.addEventListener('click', loadMoreItems);
  }
  
    function initializeMasonry() {
    const masonry  = new Masonry(grid, {
      itemSelector: '.comparison-slider',
      gutter: gutterSize,
      
    });
   }

  function createFullComparisonSliderList() {
    const container = document.querySelector('.comparison__slider-list');
    comparisonImagesData.forEach(({ beforeName, afterName, desc, categories }, index) => {
      const listItem = createComparisonSliderItem({beforeName, afterName, desc, categories});
      listItem.classList.add('comparison-slider');
          container.appendChild(listItem);
    });
  }

  function createInitialComparisonSliderList() {
    comparisonImagesData.slice(0, itemsPerPage).forEach(createComparisonSlider);
  }

  function createComparisonSlider({ beforeName, afterName, desc, categories }) {
    const listItem = createComparisonSliderItem({ beforeName, afterName, desc, categories });
    listItem.classList.add('comparison-slider');
    grid.appendChild(listItem);
    
    displayedItems++;
  }  

  function loadMoreItems() {
    const itemsToLoad = comparisonImagesData.slice(displayedItems, displayedItems + itemsPerPage);
    itemsToLoad.forEach(createComparisonSlider);
    initializeSlider();
    generateUpdatedMasonry();
      if (displayedItems === comparisonImagesData.length ) {
        animatedBtnWrap.classList.remove('isVisible');
      }
  }
 
function createCategoryItemsList() {
  createCategoryItem("Всі", 'Показати всі категорії');
  const uniqueCategories = getUniqueCategories();
  uniqueCategories.forEach(category => {
    const ariaLabel = `Фільтрувати за категорією ${category}`;
    createCategoryItem(category, ariaLabel);
  });
}

function getUniqueCategories() {
  const uniqueCategories = new Set();
  comparisonImagesData.forEach(({ categories }) => {
    categories.forEach(category => uniqueCategories.add(category));
  });
  return Array.from(uniqueCategories);
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
    const {target} = e;
    if (!target.classList.contains('category__button')) {
      return;
    }
    updateChosenCategory(target.textContent);
    const allCategoryButtons = buttonContainer.querySelectorAll('.category__button');
    toggleCategory(target, allCategoryButtons);
    resetComparisonSliderList();
    updateComparisonSliderList();
    filterImages();
    toggleShowMoreImagesBtn(chosenCategory);
    generateUpdatedMasonry();
    initializeSlider();
  }

  function resetComparisonSliderList() {
    grid.innerHTML ='';
  }
   function updateComparisonSliderList() {
    if(chosenCategory !== 'Всі') {
      createFullComparisonSliderList();
    } else {
      displayedItems = 0;
      createInitialComparisonSliderList();
    }
   }

  function toggleCategory(btn, allBtnList) {
    allBtnList.forEach(btn => btn.classList.remove('category__button--active'))
    btn.classList.add('category__button--active')
  }

  function toggleShowMoreImagesBtn(chosenCategory) {
    animatedBtnWrap.classList.toggle('isVisible', chosenCategory === 'Всі');
  }

  function updateChosenCategory(text) {
    chosenCategory = text;
  }

  function filterImages() {
    const pictureList = grid.querySelectorAll('.comparison-slider');
    pictureList.forEach(item => {
      const categories = item.dataset.categories.split(', ');
      const hasChosenCategory = chosenCategory === 'Всі' || categories.includes(chosenCategory);
      item.classList.toggle('filtered', !hasChosenCategory);
    });
  }

  function generateUpdatedMasonry() {
      const masonry = new Masonry(grid, {
        itemSelector: '.comparison-slider:not(.filtered)',
        gutter: gutterSize,
      });
      masonry.layout();
  }

 
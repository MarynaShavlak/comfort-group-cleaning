
import Masonry from "masonry-layout";
import { comparisonImagesData } from './before-after-data';
import { createComparisonSliderItem } from './generate-comparison-slider';
import { initializeSlider } from "./initialize-comparison-slider";

const grid = document.querySelector('.comparison__slider-list');
const buttonContainer = document.querySelector(".comparison__categories-list");
const showMoreBtn = document.querySelector('.btn-wrap--more');
const showLessBtn = document.querySelector('.btn-wrap--less');
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
    showMoreBtn.addEventListener('click', showMoreItems);
    showLessBtn.addEventListener('click', showLessItems);
  }
  
    function initializeMasonry() {
    const masonry  = new Masonry(grid, {
      itemSelector: '.comparison-slider',
      gutter: gutterSize,
      
    });
   }

  function createFullComparisonSliderList() {
    const fragment = document.createDocumentFragment();
    comparisonImagesData.forEach(({ beforeName, afterName, desc, categories }) => {
      const listItem = createComparisonSliderItem({beforeName, afterName, desc, categories});
      fragment.appendChild(listItem);
    });
    grid.appendChild(fragment);
  }

  function createInitialComparisonSliderList() {
    const fragment = document.createDocumentFragment(); 
      comparisonImagesData.slice(0, itemsPerPage).forEach(item => {
      const { beforeName, afterName, desc, categories } = item;
      const listItem = createComparisonSliderItem({ beforeName, afterName, desc, categories });
      fragment.appendChild(listItem); 
      displayedItems++;
    });
  
    grid.appendChild(fragment); 
  }


  function createComparisonSlider({ beforeName, afterName, desc, categories }) {
    const listItem = createComparisonSliderItem({ beforeName, afterName, desc, categories });
    grid.appendChild(listItem);
    displayedItems++;
  }  

  
function createCategoryItemsList() {
  const uniqueCategories = getUniqueCategories();
  createCategoryItem("Всі", 'Показати всі категорії');
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
    toggleShowBtnsVisibility(chosenCategory);
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

  function toggleShowBtnsVisibility(chosenCategory) {
    showMoreBtn.classList.toggle('isVisible', chosenCategory === 'Всі');
    showLessBtn.classList.remove('isVisible', chosenCategory === 'Всі');
  }


  function showMoreItems() {
    const itemsToLoad = comparisonImagesData.slice(displayedItems, displayedItems + itemsPerPage);
    itemsToLoad.forEach(createComparisonSlider);
    initializeSlider();
    generateUpdatedMasonry();
    updateButtonsVisibility();
    }


  function showLessItems() {
    displayedItems = displayedItems - itemsPerPage;
    const items = grid.querySelectorAll('.comparison-slider');
    const newItems  = Array.from(items).slice(0, items.length - itemsPerPage);
    resetComparisonSliderList();
    newItems.forEach(item => {
      grid.appendChild(item);
    });
    initializeSlider();
    generateUpdatedMasonry();
    updateButtonsVisibility();
   
  }

  function updateButtonsVisibility() {
    showLessBtn.classList.toggle('isVisible', displayedItems > itemsPerPage);
    showMoreBtn.classList.toggle('isVisible', displayedItems < comparisonImagesData.length);
  }
 
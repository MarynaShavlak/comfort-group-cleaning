import { teamMembersData, teamCategoryNames,  } from "./team-data";
import { calculateSwipeCount, getUniqueCategories, groupTeamMembersByCategory, createSlideClassesList } from "./utils";
import { createCategoryList, createMembersNameList, createCircularSliderMarkup } from "./create-team-markup";
const prevButton = document.querySelector('.team__btn-prev');
const nextButton = document.querySelector('.team__btn-next');
const categoryList  = document.querySelector('.team__category-list');
const membersList  = document.querySelector('.team__members-name-list');
const slider = document.querySelector('.team__circular-slider');
const titleEl = document.querySelector('.member-info__title');
const expEl = document.querySelector('.member-info__exp');
const quoteEl = document.querySelector('.member-info__quote');

const state = {
    chosenCategory: 'CEO',
    slideClasses: null,
    currentIndex: 0,
    teamCategories: [],
    membersByCategory: [],
  };


initializeTeamSlider();

function initializeTeamSlider() {
    state.teamCategories = getUniqueCategories(teamMembersData);
    state.membersByCategory = groupTeamMembersByCategory(teamMembersData);
    createCategoryList(state.teamCategories, teamCategoryNames);
    createCircularSlider(state.chosenCategory);
    categoryList.addEventListener('click', handleCategoryClick);
}

function createCircularSlider(category) {
    resetSliderAndMembersList();
    addSliderButtonsEventListeners(category);
    updateSliderParameters(category);
    createCircularSliderMarkup(category, teamMembersData);
    const slides = getSliderElements() ;
    createMembersNameList(state.membersByCategory, category);
    updateMemberTablo(slides, state.currentIndex + 1);
    slider.addEventListener('click', handleSlideClick);
    membersList.addEventListener('click', handleNameClick);

      
        function prevButtonClickHandler() {
                navigateSlide(-1);
        }
      
        function nextButtonClickHandler() {
            navigateSlide(1);
        }
      
        

        function addSliderButtonsEventListeners(category) {
            if (category === state.chosenCategory) {
                prevButton.addEventListener('click', prevButtonClickHandler);
                nextButton.addEventListener('click', nextButtonClickHandler);
               }
        }

        function updateSliderParameters(category) {
            state.chosenCategory = category;
            state.currentIndex = 0;
            state.slideClasses = createSlideClassesList(category, teamMembersData);
        }
        
        function handleSlideClick(e) {
            const clickedItem = e.target;
            if (clickedItem.tagName !== 'IMG') return;
            const slide = clickedItem.closest('li');
            if (!slide || slide.classList.contains('team-active-slide')) return;
            const slideClass = slide.classList[1];
            const slideIndex = state.slideClasses.indexOf(slideClass);
            if (slideIndex !== -1) {
                navigateSlide(slideIndex === 2 ? -1 : 1);
            }
        } 

        function handleNameClick(e) {
            const nameEl = e.target;
            if (nameEl.tagName !== 'LI') return;
                if (!nameEl  || nameEl.classList.contains('name--active')) return;
                const memberID = nameEl.getAttribute('data-id');
                const slides = getSliderElements() ;
                const chosenMember = findChosenMember(slides, memberID);
                const chosenMemberSlideIndex = findChosenMemberSlideIndex(chosenMember);
                const swipeCount = calculateSwipeCount(chosenMemberSlideIndex, state.slideClasses.length);
                navigateSlides(swipeCount);
        }

        function navigateSlides(moves) {
            const direction = moves < 0 ? -1 : 1;
            for (let i = 0; i < Math.abs(moves); i++) {
                navigateSlide(direction);
            }
        }
        
        
        
        function findChosenMember(slides, memberID) {
            return[...slides].find(slide => slide.getAttribute('data-member') === memberID);
        }

        function navigateSlide(direction) {
            state.currentIndex = (state.currentIndex + direction + state.slideClasses.length) % state.slideClasses.length;
            updateSlider(direction);
        }
        
        function updateSlider(direction) {
            const slides = getSliderElements();
            removeActiveClassFromSlides(slides);
            const activeClassIndex = direction === 1 ? 0 : 2;
            moveSlides(slides, direction );
            addActiveClassToSlide(slides, activeClassIndex);
            updateMemberTablo(slides, activeClassIndex);
            updateMembersMenu(direction,slides.length );
        }
            
        function moveSlides(slides, direction ) {
            const slideCount = slides.length;
            if (slideCount <= 1) {
                return; 
              }
            slides.forEach((slide, index) => {
                const newIndex = (index + direction + slideCount) % slideCount;
                slide.classList.replace(state.slideClasses[index], state.slideClasses[newIndex]);
            });
        }
        
             
        
        
}

function handleCategoryClick(e) {
    const categoryEl = e.target;
    if (categoryEl.tagName !== 'LI' || categoryEl.classList.contains('category--active')) return;
    const category = categoryEl.getAttribute('data-category');
    createCircularSlider(category);
    updateCategoriesListMenu(category);    
}

function updateCategoriesListMenu(category) {
    const categoriesList = document.querySelectorAll('.team__category-item');
    const activeCategory = [...categoriesList].find(item => item.classList.contains('category--active'));
    if (activeCategory) {
    activeCategory.classList.remove('category--active');
    }
    const newActiveCategory = [...categoriesList].find(item => item.getAttribute('data-category') === category);
    newActiveCategory.classList.add('category--active');
    
}

function updateMembersMenu(direction, membersQuantity) {
    const teamNamesList = document.querySelectorAll('.team__name');
    const activeName = [...teamNamesList].find(name => name.classList.contains('name--active'));

    if (activeName) {
    activeName.classList.remove('name--active');
    const activeNameIndex = [...teamNamesList].indexOf(activeName);

    let newActiveNameIndex = (activeNameIndex + direction + membersQuantity) % membersQuantity;
    if (newActiveNameIndex < 0) {
        newActiveNameIndex += membersQuantity;
    }

    teamNamesList[newActiveNameIndex].classList.add('name--active');
    }
}

function updateMemberTablo(slides, index) {
    const {name,  experience, quote} = getActiveSlideData(slides, index );
    titleEl.innerHTML = name;
    expEl.innerHTML = `Досвід роботи: ${experience}`;
    quoteEl.innerHTML = `<i class="fa-solid fa-quote-left"></i> ${quote} <i class="fa-solid fa-quote-right"></i>`
}

function getSliderElements() {
    return state.slideClasses.map(className => document.querySelector(`.team__circular-section.${className}`));
}

function resetSliderAndMembersList() {
    slider.innerHTML = '';
    membersList.innerHTML = '';
}

function findChosenMemberSlideIndex(chosenMember) {
    const classList = chosenMember.classList;
    const slideIndexClass = [...classList].find(cls => cls.startsWith('slide-'));
    return slideIndexClass ? parseInt(slideIndexClass.split('-')[1], 10) : 0;
}

function removeActiveClassFromSlides(slides) {
    slides.forEach(slide => slide.classList.remove('team-active-slide'));
}

function addActiveClassToSlide(slides,index) {
    slides[index].classList.add('team-active-slide');
}

function getActiveSlideData(slides, index ) {
    const memberID = slides[index].getAttribute('data-member');
    const memberData= teamMembersData.find(member => member.memberID === memberID);
    return memberData;
}
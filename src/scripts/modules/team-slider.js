import { teamMembersData, teamCategoryNames,  } from "./team-data";
import { calculateSwipeCount, getUniqueCategories, groupTeamMembersByCategory } from "./utils";
import { createCategoryList, createMembersNameList, createCircularSliderMarkup } from "./create-team-markup";
const teamCategories = getUniqueCategories(teamMembersData);
const membersByCategory = groupTeamMembersByCategory(teamMembersData);
createCategoryList(teamCategories, teamCategoryNames);
let chosenCategory = 'windowCleaner';
let slideClasses;
let currentIndex;
createCircularSlider(chosenCategory);
const categoryList  = document.querySelector('.team__category-list');
categoryList.addEventListener('click', handleCategoryClick);


function handleCategoryClick(e) {
    const categoryEl = e.target;
    if (categoryEl.tagName !== 'LI') return;
        if (!categoryEl  || categoryEl.classList.contains('category--active')) return;
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
        function createCircularSlider(category) {
            const slider = document.querySelector('.team__circular-slider');
            slider.innerHTML = '';
            const prevButton = document.querySelector('.team__btn-prev');
            const nextButton = document.querySelector('.team__btn-next');
            const membersList  = document.querySelector('.team__members-name-list');
            membersList.innerHTML = '';
            prevButton.removeEventListener('click', ()=>handleBtnClick(-1));
            nextButton.removeEventListener('click', ()=> handleBtnClick(1));
            membersList.removeEventListener('click', handleNameClick);
            chosenCategory = category;
            currentIndex = 0;
            slideClasses = createSlideClassesList(category);

            createCircularSliderMarkup(category, teamMembersData);
            const slides = slideClasses.map(className => document.querySelector(`.team__circular-section.${className}`));
            createMembersNameList(membersByCategory, category);
            updateMemberTablo(slides, currentIndex + 1);
            
        
            prevButton.addEventListener('click', ()=>handleBtnClick(-1));
            nextButton.addEventListener('click', ()=> handleBtnClick(1));
            slider.addEventListener('click', handleSlideClick);
            membersList.addEventListener('click', handleNameClick);

               function handleBtnClick(direction ) {
                changeSlide(direction);
               } 



            function handleSlideClick(e) {
                const clickedItem = e.target;
                if (clickedItem.tagName !== 'IMG') return;
                const slide = clickedItem.closest('li');
                if (!slide || slide.classList.contains('team-active-slide')) return;
                const slideClass = slide.classList[1];
                    if (slideClass === 'slide-3') {
                    changeSlide(-1);
                } else if (slideClass === 'slide-1') {
                    changeSlide(1);
                }
            }

            function handleNameClick(e) {
                const nameEl = e.target;
                if (nameEl.tagName !== 'LI') return;
                    if (!nameEl  || nameEl.classList.contains('name--active')) return;
                    const memberID = nameEl.getAttribute('data-id');
                    const slides = slideClasses.map(className => document.querySelector(`.team__circular-section.${className}`));
                    const chosenMember = findChosenMember(slides, memberID);
                    const chosenMemberSlideIndex = getChosenMemberSlideIndex(chosenMember);
                    const swipeCount = calculateSwipeCount(chosenMemberSlideIndex, slideClasses.length);
                    changeSlides(swipeCount);
            }

            function changeSlides(moves) {
                const direction = moves < 0 ? -1 : 1;
                for (let i = 0; i < Math.abs(moves); i++) {
                    changeSlide(direction);
                }
            }
            
         

            function getChosenMemberSlideIndex(chosenMember) {
                const classList = chosenMember.classList;
                const slideIndexClass = [...classList].find(cls => cls.startsWith('slide-'));
                return slideIndexClass ? parseInt(slideIndexClass.split('-')[1], 10) : 0;
            }
            

            function findChosenMember(slides, memberID) {
                return[...slides].find(slide => slide.getAttribute('data-member') === memberID);
            }

            function changeSlide(direction) {
                
                currentIndex = (currentIndex + direction + slideClasses.length) % slideClasses.length;
                updateSlider(direction);
            }
            
            function updateSlider(direction) {
                const slides = slideClasses.map(className => document.querySelector(`.team__circular-section.${className}`));
                removeActiveClassFromSlides(slides);
                const activeClassIndex = direction === 1 ? 0 : 2;
                moveSlides(slides, direction );
                addActiveClassToSlide(slides, activeClassIndex);
                updateMemberTablo(slides, activeClassIndex);
                updateMembersListMenu(direction,slides.length );
            }
                
            function moveSlides(slides, direction ) {
                const slideCount = slideClasses.length;
                if (direction === 1) {
                    slides.forEach((slide, index) => {
                        const newIndex = (index + direction) % slideCount;
                        slide.classList.replace(slideClasses[index], slideClasses[newIndex]);
                    });
                } else if (direction === -1) {
                    slides.forEach((slide, index) => {
                        const newIndex = (index + direction + slideCount) % slideCount;
                        slide.classList.replace(slideClasses[index], slideClasses[newIndex]);
                    });
                }
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
            
            function updateMemberTablo(slides, index) {
                const titleEl = document.querySelector('.member-info__title');
                const expEl = document.querySelector('.member-info__exp');
                const quoteEl = document.querySelector('.member-info__quote');
                const {name,  experience, quote} = getActiveSlideData(slides, index );
                titleEl.innerHTML = name;
                expEl.innerHTML = `Досвід роботи: ${experience}`;
                quoteEl.innerHTML = `<i class="fa-solid fa-quote-left"></i> ${quote} <i class="fa-solid fa-quote-right"></i>`
            }
        }

        function createSlideClassesList(category) {
            const membersQuantity = teamMembersData.filter(item => item.category === category).length;
            let slideClasses = [];
            for (let i = 1; i <= membersQuantity; i++) {
                slideClasses.push('slide-' + i);
            }
            return slideClasses;
        }

        function updateMembersListMenu(direction, membersQuantity) {
            const teamNamesList = document.querySelectorAll('.team__name');
            const activeName = [...teamNamesList].find(name => name.classList.contains('name--active'));
            console.log('activeName: ', activeName);
        
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


        
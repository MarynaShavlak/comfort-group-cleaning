import { teamMembersData } from "./team-data";
const teamCategories = getUniqueCategories();
const membersByCategory = groupTeamMembersByCategory(teamMembersData);
console.log('membersByCategory : ', membersByCategory );


function createCircularSlider(config) {
    // const { sliderSelector, prevButtonSelector, nextButtonSelector, slideClasses } = config;
    const { sliderSelector, prevButtonSelector, nextButtonSelector, slideClasses, category } = config;
    let currentIndex = 0;
    const slides = slideClasses.map(className => document.querySelector(`.team__circular-section.${className}`));
    

    updateMemberTablo(slides, currentIndex + 1);
    const slider = document.querySelector(sliderSelector);
    const prevButton = document.querySelector(prevButtonSelector);
    const nextButton = document.querySelector(nextButtonSelector);
  
    prevButton.addEventListener('click', () => changeSlide(-1));
    nextButton.addEventListener('click', () => changeSlide(1));
    slider.addEventListener('click', handleSlideClick);

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

createCircularSlider({
    sliderSelector: '.team__circular-slider',
    category: 'window-cleaner',
    prevButtonSelector: '.team__btn-prev',
    nextButtonSelector: '.team__btn-next',
    slideClasses: ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6'],
  });

  function getUniqueCategories() {
    const uniqueCategories = new Set();
    teamMembersData.forEach(({ category }) => {
        uniqueCategories.add(category);
    }
    )  
     return Array.from(uniqueCategories);
  }

function groupTeamMembersByCategory(teamMembersData) {
    return Object.values(
      teamMembersData.reduce((categoryData, member) => {
        const { category, name } = member;
        if (!categoryData[category]) {
          categoryData[category] = { name: category, members: [] };
        }
        categoryData[category].members.push(name);
        return categoryData;
      }, {})
    );
  }

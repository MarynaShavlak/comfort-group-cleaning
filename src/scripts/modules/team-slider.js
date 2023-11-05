const slider = document.querySelector('.team__circular-slider');
const prevButton = document.querySelector('.team__btn-prev');
const nextButton = document.querySelector('.team__btn-next');
const slideClasses = ['slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5', 'slide-6'];
let currentIndex = 0;
nextButton.addEventListener('click', () => changeSlide(1));
prevButton.addEventListener('click', () => changeSlide(-1));

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
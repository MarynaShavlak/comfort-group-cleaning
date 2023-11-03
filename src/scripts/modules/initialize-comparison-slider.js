import VanillaTilt from 'vanilla-tilt';

export function initializeSlider() {
  const sliders = document.querySelectorAll(".comparison-slider");
  sliders.forEach(initSlider);
  function initSlider(slider) {
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
  }
}
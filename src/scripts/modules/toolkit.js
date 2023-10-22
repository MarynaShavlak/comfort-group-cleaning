$(function(){
  const toolkitsList = document.querySelectorAll('.plus-btn--toolkit');
const roomsBtnList = $('.rooms__item');
const kitchenSchema = $('.schema--kitchen');
const roomSchema = $('.schema--room');
const bathSchema = $('.schema--bath');
const roomsSchemaList = $('.rooms__schema');

toolkitsList.forEach(el => {
  el.addEventListener('mouseenter', () => {
    toggleToolkitDescVisibility(el);
  });
  el.addEventListener('mouseleave', () => {
    toggleToolkitDescVisibility(el);
  });
});

roomsBtnList.on("click", function(e) {
  onRoomBtnClick(e);
});

function toggleToolkitDescVisibility(el) {
  const parentItem = el.closest('.toolkit__wrapper');
  const descItem = parentItem.querySelector(':first-child');
  descItem.classList.toggle('is-shown');
}


function onRoomBtnClick(e) {
  const clickedButton = $(e.target);
  if (clickedButton.hasClass('rooms__item--current')) return;

  roomsBtnList.each(function() {
    if ($(this).is(clickedButton)) {
      const id = clickedButton.attr('id');
      setRoomSchemaToDisplay(id);
      clickedButton.addClass('rooms__item--current');
    } else {
      $(this).removeClass('rooms__item--current');
    }
  });
}

function setRoomSchemaToDisplay(id) {
  const classListToRemove = [
    'rooms__schema--current',
    'rooms__schema--next',
    'rooms__schema--prev',
  ];

  roomsSchemaList.each(function() {
    const schemaItem = $(this);
    classListToRemove.forEach(function(className) {
      schemaItem.removeClass(className);
    });
  });

  if (id === 'room-1') {
    kitchenSchema.addClass('rooms__schema--current');
    roomSchema.addClass('rooms__schema--next');
    bathSchema.addClass('rooms__schema--prev');
  } else if (id === 'room-2') {
    kitchenSchema.addClass('rooms__schema--prev');
    roomSchema.addClass('rooms__schema--current');
    bathSchema.addClass('rooms__schema--next');
  } else if (id === 'room-3') {
    kitchenSchema.addClass('rooms__schema--next');
    roomSchema.addClass('rooms__schema--prev');
    bathSchema.addClass('rooms__schema--current');
  }
}



})
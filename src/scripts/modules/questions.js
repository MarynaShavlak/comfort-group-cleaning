import $ from "jquery";
$(function() {
  const toggleAnswerBtnList = $('.toggle-question-btn');
  const accordionsList = $('.accordion');

  toggleAnswerBtnList.on('click', function() {
    const button = $(this);
    if ($(event.target).is(button)) {
      toggleBtnIcon(button);
    }
    toggleAnswerBtnList.each(function() {
      closeBtnIcon($(this));
    });
  });

  accordionsList.each(function() {
    const intro = $(this).find('.accordion__intro');
    intro.on('click', function() {
      handleAccordionClick($(this).closest('.accordion'));
    });
  });

  function closeBtnIcon(btn) {
    const plusIcon = btn.find('.icon--plus');
    const minusIcon = btn.find('.icon--minus');
    plusIcon.removeClass('isHidden');
    minusIcon.addClass('isHidden');
  }

  function toggleBtnIcon(btn) {
    const plusIcon = btn.find('.icon--plus');
    const minusIcon = btn.find('.icon--minus');
    plusIcon.toggleClass('isHidden');
    minusIcon.toggleClass('isHidden');
  }

  function openAccordion(accordion) {
    const content = accordion.find('.accordion__content');
    accordion.addClass('accordion__active');
    content.css('max-height', content[0].scrollHeight + 'px');
  }

  function closeAccordion(accordion) {
    const content = accordion.find('.accordion__content');
    accordion.removeClass('accordion__active');
    content.css('max-height', '');
  }

  function toggleAccordion(accordion) {
    const content = accordion.find('.accordion__content');

    if (content.css('max-height') !== '0px') {
      closeAccordion(accordion);
    } else {
      accordionsList.each(function() {
        closeAccordion($(this));
      });
      openAccordion(accordion);
    }
  }

  function handleAccordionClick(accordion) {
    const btn = accordion.find('.toggle-question-btn');
    toggleAnswerBtnList.each(function() {
      closeBtnIcon($(this));
    });
    toggleAccordion(accordion);
    toggleBtnIcon(btn);
  }
});

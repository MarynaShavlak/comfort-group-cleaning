import {
  handleInputBlur,
  setShedulerVisibilityOptions,
  toggleClosestVisibility,
} from './common';
import {
  getTimePickerElements,
  getClosestDateInput,
  getClosestCalendarBlock,
} from './get-elements';
import { parseDateStringToDate, getDayNameFromDate } from './dates';
import { storeDataInLocalStorage, getDataFromStorage } from './local-storage';

const workShedule = [
  { day: 'пн', min: '07', max: '21' },
  { day: 'вт', min: '07', max: '21' },
  { day: 'ср', min: '07', max: '21' },
  { day: 'чт', min: '07', max: '21' },
  { day: 'пт', min: '07', max: '21' },
  { day: 'сб', min: '10', max: '19' },
  { day: 'нд', min: '10', max: '19' },
];

const timePickerElements = document.querySelectorAll('.time-picker-wrap');
timePickerElements.forEach(initializeTimePicker);

function initializeTimePicker(timePickerElement) {
  const {
    clockIcon,
    sheduleEl,
    hourTablo,
    minuteTablo,
    hourPicker,
    minutePicker,
    confirmTimeBtn,
    timeInput,
  } = getTimePickerElements(timePickerElement);

  let selectedTimeObj = getDataFromStorage('selectedTimeObj') || {
    hours: '15',
    minutes: '00',
  };
  storeDataInLocalStorage('selectedTimeObj', selectedTimeObj);

  timeInput.addEventListener('click', handleTimePicker);
  clockIcon.addEventListener('click', handleTimePicker);
  timeInput.addEventListener('blur', () => {
    handleInputBlur(timeInput, extractTime);
  });
  hourTablo.addEventListener('click', e =>
    onTimeCellClick(e, '.time-picker__hours')
  );
  minuteTablo.addEventListener('click', e =>
    onTimeCellClick(e, '.time-picker__minutes')
  );
  minutePicker.addEventListener('click', () =>
    togglePickerBlock(minuteTablo, hourTablo)
  );
  hourPicker.addEventListener('click', () =>
    togglePickerBlock(hourTablo, minuteTablo)
  );
  confirmTimeBtn.addEventListener('click', () => {
    resetDisabledPickerCells(timePickerElement);
    setShedulerVisibilityOptions(timePickerElement, sheduleEl, clockIcon);
  });

  function handleTimePicker() {
    selectedTimeObj = getDataFromStorage('selectedTimeObj') || {
      hours: '15',
      minutes: '00',
    };
    const dateInput = getClosestDateInput(timeInput);
    const dateString = dateInput.value;
    if (!!dateString) {
      resetDisabledPickerCells(timePickerElement);
      const { minHour, maxHour } = getMinAndMaxHours(dateString, workShedule);
      disableHourCells(timePickerElement, minHour, maxHour);
      updateFullTabloInterface(selectedTimeObj);
      updateTimePicker(selectedTimeObj);
      setShedulerVisibilityOptions(timePickerElement, sheduleEl, clockIcon);
      toggleClosestCalendarVisibility(timeInput);
      setTimeInputInterface(timePickerElement, timeInput);
    } else {
      showWarningMessage(timeInput);
    }
  }

  function onTimeCellClick(e, blockSelector) {
    const clickedElement = e.target;
    const isDisabled = clickedElement.classList.contains('disabled');
    if (isDisabled) return;
    if (!validateClickedNumber(clickedElement)) return;
    const partTimeName = getTimePartName(blockSelector);
    const elements = timePickerElement.querySelectorAll(`.${partTimeName}`);
    updateChosenPickerBlock(clickedElement, elements);
    const block = timePickerElement.querySelector(blockSelector);
    const value = clickedElement.dataset.id;
    updateBlockTabloInterface(block, value);
    updateTimeInput(blockSelector, value);
  }

  function updateTimePicker(selectedTimeObj) {
    const orderHour = selectedTimeObj.hours;
    const orderMinute = selectedTimeObj.minutes;

    const allHourElements = timePickerElement.querySelectorAll('.hours');
    const allMinuteElements = timePickerElement.querySelectorAll('.minutes');

    const hourElement = [...allHourElements].find(
      el => el.getAttribute('data-id') == orderHour
    );

    const minuteElement = [...allMinuteElements].find(
      el => el.getAttribute('data-id') == orderMinute
    );

    updateChosenPickerBlock(hourElement, allHourElements);
    updateChosenPickerBlock(minuteElement, allMinuteElements);
  }

  function getMinAndMaxHours(dateString, workShedule) {
    const dateObject = parseDateStringToDate(dateString);
    const dayName = getDayNameFromDate(dateObject);
    const dayInfoObj = workShedule.find(d => d.day === dayName);
    const minHour = parseInt(dayInfoObj.min);
    const maxHour = parseInt(dayInfoObj.max);
    return { minHour, maxHour };
  }
  function showWarningMessage(timeInput) {
    timeInput.value = 'Оберіть спочатку дату для прибирання';
  }

  function disableHourCells(timePickerElement, minHour, maxHour) {
    const hourCells = [...timePickerElement.querySelectorAll('.hours')];

    const cellsToMakeDisable = hourCells.filter(cell => {
      const value = parseInt(cell.getAttribute('data-id'));
      return value < minHour || value > maxHour;
    });

    cellsToMakeDisable.forEach(cell => {
      if (!cell.classList.contains('disabled')) {
        cell.classList.remove('active');
        cell.classList.add('disabled');
      }
    });
  }

  function resetDisabledPickerCells(timePickerElement) {
    const hourCells = [...timePickerElement.querySelectorAll('.hours')];
    hourCells.forEach(cell => {
      cell.classList.remove('disabled');
    });
  }

  function setTimeInputInterface(timePickerElement, timeInput) {
    const isTimePickerVisible =
      !timePickerElement.classList.contains('isHidden');
    if (isTimePickerVisible) {
      timeInput.value = `${selectedTimeObj.hours} : ${selectedTimeObj.minutes}`;
    }
  }

  function validateClickedNumber(clickedElement) {
    return (
      clickedElement.classList.contains('number') &&
      !clickedElement.classList.contains('active')
    );
  }

  function updateChosenPickerBlock(clickedElement, elements) {
    [...elements].map(element =>
      element === clickedElement
        ? selectElement(element)
        : deselectElement(element)
    );
  }

  function updateBlockTabloInterface(block, value) {
    block.innerHTML = value;
  }

  function updateFullTabloInterface(selectedTimeObj) {
    const orderHour = selectedTimeObj.hours;
    const orderMinute = selectedTimeObj.minutes;
    const blockHour = timePickerElement.querySelector('.time-picker__hours');
    const blockMinute = timePickerElement.querySelector(
      '.time-picker__minutes'
    );
    updateBlockTabloInterface(blockHour, orderHour);
    updateBlockTabloInterface(blockMinute, orderMinute);
  }

  function updateTimeInput(selector, value) {
    const partTime = getTimePartName(selector);
    selectedTimeObj[partTime] = value;
    storeDataInLocalStorage('selectedTimeObj', selectedTimeObj);
    setTimeInputInterface(timePickerElement, timeInput);
  }
  function selectElement(element) {
    element.classList.add('active');
  }

  function deselectElement(element) {
    element.classList.remove('active');
  }

  function getTimePartName(selector) {
    return selector.split('__')[1];
  }

  function extractTime(inputString) {
    const trimmedString = inputString.trim();
    const timeMatch = trimmedString.match(/\d{2}\s*:\s*\d{2}/);
    return timeMatch ? timeMatch[0] : null;
  }

  function togglePickerBlock(pickerToShow, pickerToHide) {
    const isVisible = !pickerToShow.classList.contains('isHidden');
    if (isVisible) return;
    pickerToShow.classList.remove('isHidden');
    pickerToHide.classList.add('isHidden');
  }

  function toggleClosestCalendarVisibility(timeInput) {
    const wrap = getClosestCalendarBlock(timeInput);
    toggleClosestVisibility(wrap, 'calendar', 'icon--calendar');
  }
}

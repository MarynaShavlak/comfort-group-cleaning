import { getClosestIcon } from './common';

export function getTimePickerElements(el) {
  const clockIcon = getClosestIcon(el, 'icon--clock');
  const sheduleEl = el.parentElement.querySelector('.work-shedule');
  const hourTablo = el.querySelector('.tablo--hours');
  const minuteTablo = el.querySelector('.tablo--minutes');
  const hourPicker = el.querySelector('.time-picker__hours');
  const minutePicker = el.querySelector('.time-picker__minutes');
  const confirmTimeBtn = el.querySelector('.time-picker__btn');
  const timeInput =
    el.parentElement.previousElementSibling.querySelector('[name="userTime"]');
  return {
    clockIcon,
    sheduleEl,
    hourTablo,
    minuteTablo,
    hourPicker,
    minutePicker,
    confirmTimeBtn,
    timeInput,
  };
}

export function getClosestDateInput(timeInput) {
  return timeInput
    .closest('li')
    .previousElementSibling.querySelector('[name="userDate"]');
}

export function getClosestCalendarBlock(timeInput) {
  return timeInput
    .closest('li')
    .previousElementSibling.querySelector('.shedule-wrap');
}

export function getCalendarElements(el) {
  const calendarIcon = getClosestIcon(el, 'icon--calendar');
  const dateInput =
    el.parentElement.previousElementSibling.querySelector('[name="userDate"]');
  el.parentElement.previousElementSibling.querySelector('.icon--calendar');

  const sheduleEl = el.parentElement.querySelector('.work-shedule');
  const calendarBody = el.querySelector('.calendar__body');
  const calendarHeadMonthAndYear = el.querySelector('.calendar__monthYear');
  const prevMonthBtn = el.querySelector('.calendar__prevMonth-btn');
  const nextMonthBtn = el.querySelector('.calendar__nextMonth-btn');

  return {
    calendarIcon,
    dateInput,
    sheduleEl,
    calendarBody,
    calendarHeadMonthAndYear,
    prevMonthBtn,
    nextMonthBtn,
  };
}

export function getClosestTimeInput(dateInput) {
  return dateInput
    .closest('li')
    .nextElementSibling.querySelector('[name="userTime"]');
}

export function getClosestTimePickerBlock(dateInput) {
  return dateInput
    .closest('li')
    .nextElementSibling.querySelector('.shedule-wrap');
}

export function getThemeTogglerElements() {
  const themeToggler = document.querySelector('.theme-toggler-wrap');
  const themeCircle = document.querySelector('.theme__circle');
  const sunRays = document.querySelectorAll('.circle__ray');
  const sunIcon = document.querySelector('.circle__sun');
  const moonIcon = document.querySelector('.circle__moon');
  return { themeToggler, themeCircle, sunRays, sunIcon, moonIcon };
}

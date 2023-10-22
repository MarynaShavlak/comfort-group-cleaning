export function getCurrentDateAsString() {
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  return `${day}/${month}/${year}`;
}

export function extractDate(inputString) {
  const trimmedString = inputString.trim();
  const datePattern = /\d{2}\/\d{2}\/\d{4}/;
  const match = trimmedString.match(datePattern);
  if (match) {
    return match[0];
  } else {
    return null;
  }
}

export function isDateBeforeToday(date, todayObj) {
  return date < todayObj;
}

export function convertDateFormat(dateString) {
  const parts = dateString.split('/');
  const [day, month, year] = parts;
  const newDateString = `${month}/${day}/${year}`;
  return newDateString;
}

export function reverseConvertDateFormat(dateString) {
  const parts = dateString.split('/');
  const [month, day, year] = parts;
  const newDateString = `${day}/${month}/${year}`;
  return newDateString;
}

export function calculateStartDay(firstDayOfMonth) {
  let initialNumberOfWeekDay = firstDayOfMonth.getDay();
  if (initialNumberOfWeekDay === 0) {
    initialNumberOfWeekDay = 7;
  }
  return initialNumberOfWeekDay;
}

export function getLastDayOfPrevMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

export function getCurrentYearAndMonth(obj) {
  const year = obj.getFullYear();
  const month = obj.getMonth();
  return { month, year };
}

export function getMonthBoundaryDates(year, month) {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonthObj = new Date(year, month + 1, 0);
  return { firstDayOfMonth, lastDayOfMonthObj };
}

export function formatDateInfo(day, month, year) {
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month === 0 ? 12 : month;
  const formattedYear = month === 0 ? year - 1 : year;

  return {
    formattedDay,
    formattedMonth,
    formattedYear,
  };
}

export function parseDateStringToDate(dateString) {
  const dateParts = dateString.split('/');

  var day = parseInt(dateParts[0], 10);
  var month = parseInt(dateParts[1], 10) - 1;
  var year = parseInt(dateParts[2], 10);

  return new Date(year, month, day);
}

export function getDayNameFromDate(dateObj) {
  const locale = 'uk-UA';
  const options = { weekday: 'short' };
  const dayOfWeekString = dateObj.toLocaleDateString(locale, options);
  return dayOfWeekString;
}

export const APP_NAME = "PIGGY-BANK";

export const PIGGY_BANK_CATEGORIES = "app-categories";
export const PIGGY_BANK_DATA = "app-data";

export const API_DATA_URL = "/api/data";
export const CATEGORIES_FILENAME = "categories";
export const DATA_FILENAME = "data";

export const ID_DIALOG_ADD_PROPERTY = "add-category";

export const DEFAULT_COLORS = [
  "blue",
  "lightgray",
  "lightgreen",
  "lightyellow",
  "orangered",
];

//export const formatterMonth = new Intl.DateTimeFormat('ru-RU', { month: 'long' });
// Получаем полное название месяца const monthName = formatterMonth.format(date);
export const MONTHS_RU = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
export const MONTHS_RU_SHORT = [
  "янв.",
  "февр.",
  "март",
  "апр.",
  "май",
  "июнь",
  "июль",
  "авг.",
  "сент.",
  "окт.",
  "нояб.",
  "дек.",
];

export const CURRENT_MONTH_IND = `${new Date().getMonth()}`;

export const formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  // Optional: currencyDisplay can be 'symbol' (default), 'name', or 'code'
  // currencyDisplay: 'symbol', // '123 456,79 руб.' (default for ru-RU)
  // currencyDisplay: 'name',   // '123 456,79 российских рублей'
  // currencyDisplay: 'code',   // '123 456,79 RUB'
});

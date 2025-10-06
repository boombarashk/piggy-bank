import { TTabPage } from "./types";

export const TAB_PAGES: TTabPage[] = [
  { text: "Категории", route: "/categories" },
  { text: "Расходы", route: "/data" }, //fixme expenses
  { text: "Диаграмма", route: "/chart" },
];

export const PIGGY_BANK_START = "app-started";

export const API_FILES_URL = "/api/files";

export const ID_DIALOG_ADD_PROPERTY = "add-category";

export const DEFAULT_COLORS = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "lightgray",
];
export const POINT_FORMAT = "<b>{point.y:.2f} ₽</b>";

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
});

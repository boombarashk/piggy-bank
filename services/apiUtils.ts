import fs from "fs";
import path from "path";
import { EntityEnum, TCategory, TExpense, TIncome } from "../types";

const WRONG_FILENAME = "Некорректное имя файла";
export const READ_ERROR_MSG = "Ошибка чтения файла";
export const UPDATE_ERROR_MSG = "Ошибка записи файла";
export const UPDATE_SUCCESS_MSG = "Данные успешно сохранены";

export function getPath(filename: string | null) {
  if (filename && Object.keys(EntityEnum).includes(filename)) {
    return path.join(process.cwd(), "public", `storage/${filename}.json`);
  } else {
    throw Error(WRONG_FILENAME);
  }
}

export function getDataByPath(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

export function updateByPath(
  filePath: string,
  newData:
    | Record<string, TExpense[]>
    | Record<"data", TCategory[] | Record<string, TIncome>>,
) {
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
}

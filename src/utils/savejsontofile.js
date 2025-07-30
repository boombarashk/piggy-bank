// Сохранение файлов в Downloads домашней директории не подходит, потому что каждый раз новая версия файла

import { APP_NAME } from "../consts";

export const saveJsonToFile = (jsonData, filename) => {
  const jsonString = JSON.stringify(jsonData, null, 2);
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${APP_NAME}-${filename}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
// src/DataManager.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APP_NAME, PIGGY_BANK_CATEGORIES, PIGGY_BANK_DATA } from '../consts';

const DataManager = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  // Функция для загрузки начальных данных из localStorage
  // todo обеспечить проверку наличия, чтение из файлов и сохранения в файл
  const loadInitialData = (propName) => {
    let savedData = localStorage.getItem(propName);
    if (!savedData || savedData === '') {
      // Файл отсутствует, создаём пустой объект данных
      savedData = '{}';
      localStorage.setItem(propName, savedData);
    }
    try {
      const parsedData = JSON.parse(savedData);
      // если 'app-data' то SET_DATA
      dispatch({ type: 'SET_DATA', payload: parsedData });
    } catch(e) {
      console.error("Ошибка парсинга данных:", e.message);
    }
  };

  // Функция для сохранения изменений в localStorage
  const saveChanges = (propName) => {
    localStorage.setItem(propName, JSON.stringify(data));
    alert("Данные успешно сохранены!");
  };

  useEffect(() => {
    // Загружаем начальные данные при монтировании компонента
    [
      PIGGY_BANK_CATEGORIES,
      PIGGY_BANK_DATA
    ].forEach(propName => loadInitialData(propName));
  }, []);

  return (
    <div>
      <h1>Менеджер данных:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={saveChanges}>Сохранить</button>
    </div>
  );
}

export default DataManager;
# Приложение по учету расходов

ТЗ:
SPA-приложение, интерфейс для настройки, учета и визуализации расходов.
Требуется создать страницу с 3мя разделами: Категории, Расходы*, Диаграмма

## Категории

В отсутствие данных выводится кнопка "Добавить категорию".
При наличие данных под кнопкой отображается список, представляющий собой легенду к диаграмме трат - прямоугольник цвета категории на диаграмме и название**

## Расходы
## Диаграмма

* в дальнейшем этот раздел расшириться за счет более, чем 1 года
** цвета выставляются автоматически, в дальнейшем можно добавить функционал выбора цвета

## Данные приложения

Хранятся в директории с приложением.
Алгоритм действий:
 - Проверяем существование файла public/data/[год].json. Если файла текущего года нет — создаем пустой объект и сохраняем его.
 - Если файл существует — считываем его и записываем в Redux Store.
 - Реагируем на событие кнопки сохранения и обновляем хранящийся объект в локальном хранилище браузера.

Компонент DataManager проверяет наличие файла и сохраняет изменения в localStorage.

Структура следующая:
1. файл categories.json сохраняет категории расходов. Данные имеют вид [hashid]: {name: 'Название категории', color: #ddd}
Название обязательно, цвет - нет (для отображения на диаграмме)
2. 2025.json [номер месяца]: {[hashid категории]: сумма}

## DEPRECATED Create React App

Инструкция по миграции на next с [Create React App](https://nextjs.org/docs/app/guides/migrating/from-create-react-app).

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

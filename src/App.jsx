import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import DataManager from './DataManager';

import Tabs from './components/Tabs/Tabs';
import Categories from './components/Categories/Categories';

function App() {
  return (
    <Provider store={store}>
      <DataManager />

      <Tabs/>

      <div className="content">
        <Categories />
        {/*
        <div id="expenses" class="tab-content active">
                <form class="expense-form">
                    <select class="select">
                        <option value="" disabled selected>Выберите категорию</option>
                        <option value="category1">Категория 1</option>
                        <option value="category2">Категория 2</option>
                    </select>
                    <input type="number" placeholder="Сумма" class="input-number">
                    <button type="submit" class="ok-button">ОК</button>
                </form>

                <table class="expense-table">
                    <thead>
                        <tr>
                            <th>Категории</th>
                            <th>Январь</th>
                            <th>Февраль</th>
                            <th>Март</th>
                            <!-- Добавьте остальные месяцы -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Категория 1</td>
                            <td>1 000</td>
                            <td>2 000</td>
                            <td>3 000</td>
                        </tr>
                        <!-- Добавьте остальные категории -->
                    </tbody>
                </table>
            </div>

            <div id="chart" class="tab-content">
                <p>Здесь будет круговая диаграмма.</p>
                <!-- Вставьте код для диаграммы -->
            </div>
        */}
      </div>
    </Provider>
  );
}

export default App;

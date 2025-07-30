import React from 'react';
import { Provider } from 'react-redux';
/*import ReactDOM from 'react-dom/client';

import App from '../App';

const root = ReactDOM.createRoot(document.getElementsByTagName('main')[0]);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/
// Импортируем глобальные стили
//import '@/styles/globals.css';
// Импортируем компонент макета RootLayout
//import RootLayout from '@/components/Layout';

import { store } from "../store";
import RootLayout from './layout';
import Tabs from '@/components/Tabs/Tabs';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      
      <RootLayout>
      <Tabs/>

      <div className="content">
        <Component {...pageProps} />
      </div>
      </RootLayout>
    </Provider>
  );
}
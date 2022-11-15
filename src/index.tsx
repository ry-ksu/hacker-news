// Library
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
// Components
import App from './components/app';
// Style
import './index.css';
// Other
import store from './store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from '.';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';

describe('App component', () => {
  test('render App', () => {
    // Рендерим компонент
    // Проверяем, что компонент отрисовался
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(getByTestId('storiesPage/container')).toBeInTheDocument();
  });
});

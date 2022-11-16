import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { StoriesPage } from './StoriesPage';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('storiesPage tests', () => {
  // Рендерим компонент
  // Проверяем, что компонент отрисовывается
  test('page has header', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoriesPage />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(getByTestId('storiesPage/container')).toBeInTheDocument();
    expect(getByTestId('storiesPage/header')).toBeInTheDocument();
    expect(getByTestId('storiesPage/button')).toBeInTheDocument();
  });

  // Проверяем, что дефолтное поведение работает
  // (Loader отрисовывается)
  test('page has header', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <StoriesPage />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(getByTestId('loader')).toBeInTheDocument();
  });
});

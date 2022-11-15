import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import { StoryPage } from './StoryPage';
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
        <StoryPage />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(getByTestId('storyPage/container')).toBeInTheDocument();
    expect(getByTestId('storyPage/header')).toBeInTheDocument();
    expect(getByTestId('storyPage/buttons')).toBeInTheDocument();
  });

  // Рендерим компонент
  // Проверяем, что дефолтное поведение работает
  // (Пользователю предлагают перейти на главную страницу)
  test('page has header', () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <StoryPage />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(getByTestId('warning')).toBeInTheDocument();
    expect(getByText(/пожалуйста, перейдите на главную страницу/i)).toBeInTheDocument();
  });
});

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
});

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

  test('switch stories/story page', async () => {
    // Рендерим компонент
    // Проверяем, что компонент отрисовался
    // Проверяем, что страница, на которую мы хотим, перейти не отрисована
    // Изменяем страницу при помощи header-menu
    // Проверяем, что новый компонент отрисовался
    // Изменяем страницу при помощи header-menu
    // Проверяем, что новый компонент отрисовался
    const { getByTestId, getByText, findByTestId, queryByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>,
      { wrapper: BrowserRouter }
    );

    expect(getByTestId('storiesPage/container')).toBeInTheDocument();
    expect(queryByTestId('storyPage/container')).toBeNull();
    fireEvent.click(getByText('Страница новости'));
    expect(await findByTestId('storyPage/container')).toBeInTheDocument();
    fireEvent.click(getByText('Главная страница'));
    expect(await findByTestId('storiesPage/container')).toBeInTheDocument();
  });
});

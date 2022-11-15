import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Header } from '.';
import { BrowserRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('Header tests', () => {
  test('Header is render', () => {
    // Рендерим компонент
    // Проверяем, что компонент отрисовывается

    const { getByTestId } = render(<Header />, { wrapper: BrowserRouter });

    expect(getByTestId('header')).toBeInTheDocument();
  });

  test('Menu is render', () => {
    // Рендерим компонент
    // Проверяем, что отрисовывается меню

    const { getByText } = render(<Header />, { wrapper: BrowserRouter });

    expect(getByText('Главная страница')).toBeInTheDocument();
    expect(getByText('Страница новости')).toBeInTheDocument();
  });

  test('Label is render', () => {
    // Рендерим компонент
    // Проверяем, что отрисовывается лейбл

    const { getByText } = render(<Header />, { wrapper: BrowserRouter });

    expect(getByText('Hacker News')).toBeInTheDocument();
  });
});

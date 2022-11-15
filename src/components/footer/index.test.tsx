import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Footer } from '.';

afterEach(() => {
  cleanup();
});

describe('storiesPage tests', () => {
  // Рендерим компонент
  // Проверяем, что компонент jnhbcjdfkcz
  test('page has header', () => {
    const { getByTestId } = render(<Footer />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });
});

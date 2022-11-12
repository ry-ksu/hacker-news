import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Новости</Link>
        </li>
        <li>
          <Link to="story">Подробнее о новости</Link>
        </li>
      </ul>
    </header>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Главная страница</Link>
        </li>
        <li>
          <Link to="story">Страница новости</Link>
        </li>
      </ul>
    </header>
  );
};

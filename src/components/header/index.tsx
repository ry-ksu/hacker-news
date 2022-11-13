import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  const links = [
    {
      path: '/',
      label: 'Главная страница',
      exact: true,
    },
    {
      path: '/story',
      label: 'Страница новости',
      exact: false,
    },
  ];

  return (
    <header>
      <ul>
        {links.map(({ path, label, exact }) => (
          <li key={label}>
            <NavLink to={path} exact={exact}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </header>
  );
};

import React from 'react';
import style from './style.module.css';

export const Loader = ({ page }: { page: string }) => {
  return (
    <div
      data-testid="loader"
      className={
        page === 'storiesPage' ? style['loader__stories-page'] : style['loader__story-page']
      }
    >
      <div className={style.loader__img}></div>
    </div>
  );
};

import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

import style from './style.module.css';

export const Footer = () => {
  return (
    <div className={style.footer}>
      <a href="https://github.com/ry-ksu">
        <div className={style['github-container']}>
          <GitHubIcon style={{ color: '#fff' }} />
          <span className={style['github-name']}>Ряснянская Ксения, 2022 г.</span>
        </div>
      </a>
    </div>
  );
};

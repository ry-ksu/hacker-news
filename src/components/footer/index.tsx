import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

import styles from './style.module.css';

export const Footer = () => {
  return (
    <div className={styles.footer}>
      <a href="https://github.com/ry-ksu">
        <div className={styles['github-container']}>
          <GitHubIcon style={{ color: '#fff' }} />
          <span className={styles['github-name']}>Ряснянская Ксения, 2022 г.</span>
        </div>
      </a>
    </div>
  );
};

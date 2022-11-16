import React from 'react';
import { Container, Typography } from '@mui/material';
import style from './style.module.css';

export const NotFoundPage = () => {
  return (
    <div className={style['page-container']}>
      <Container>
        <Typography variant="h2" gutterBottom>
          404: Not found page
        </Typography>
      </Container>
    </div>
  );
};

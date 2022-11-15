import React from 'react';
import { Card, CardContent } from '@mui/material';

import style from './style.module.css';

export const Warning = ({ warning }: { warning: string }) => {
  return (
    <div data-testid="warning" className={style['warning-wrapper']}>
      <Card>
        <CardContent>
          <p>{warning}</p>
        </CardContent>
      </Card>
    </div>
  );
};

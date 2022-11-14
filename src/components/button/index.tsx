import React from 'react';
import { Button } from '@mui/material';

type IButton = {
  content: string;
  onClick: () => void;
  variant: 'text' | 'contained' | 'outlined';
};

export const Btn = (props: IButton) => {
  return (
    <Button variant={props.variant} onClick={props.onClick}>
      {props.content}
    </Button>
  );
};

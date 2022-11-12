import React from 'react';

type IButton = {
  content: string;
  onClick: () => void;
};

export const Button = (props: IButton) => {
  return <button onClick={props.onClick}>{props.content}</button>;
};

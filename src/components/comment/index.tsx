import React from 'react';
import { IComment } from 'types';

export const Comment = ({ parentId, comment }: { parentId: number; comment: IComment }) => {
  return <>{comment.parent === parentId ? <p>{comment.text}</p> : null} </>;
};

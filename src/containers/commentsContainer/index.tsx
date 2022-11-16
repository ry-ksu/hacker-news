import React from 'react';
import { Comment } from 'components/comment';
import { Container } from '@mui/material';
import style from './style.module.css';
import { IComment } from 'types';

export const CommentsContainer = ({
  parentId,
  commentsState,
}: {
  parentId: number;
  commentsState: IComment[];
}) => {
  return (
    <div className={style['comments-wrapper']}>
      <Container>
        {commentsState.map((comment) => {
          return parentId && <Comment key={comment.id} parentId={parentId} comment={comment} />;
        })}
      </Container>
    </div>
  );
};

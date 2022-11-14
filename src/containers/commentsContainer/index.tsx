import React from 'react';
import { useAppSelector } from 'hook';
import { Comment } from 'components/comment';
import { Container } from '@mui/material';

import style from './style.module.css';

export const CommentsContainer = ({ parentId }: { parentId: number }) => {
  const comments = useAppSelector((state) => state.comments);

  return (
    <div className={style['comments-wrapper']}>
      <Container>
        {comments.comments.map((comment) => {
          return parentId && <Comment key={comment.id} parentId={parentId} comment={comment} />;
        })}
      </Container>
    </div>
  );
};

import React from 'react';
import { IComment } from 'types';
import { CommentsContainer } from 'containers/commentsContainer';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchComments } from 'store/storyCommentsSlice';
import { Typography } from '@mui/material';
import style from './style.module.css';

export const Comment = ({ parentId, comment }: { parentId: number; comment: IComment }) => {
  const comments = useAppSelector((state) => state.comments.comments);
  const dispatch = useAppDispatch();

  const onClick = () => {
    if (comment.kids && comments.findIndex((el) => el.parent === comment.id) === -1) {
      dispatch(fetchComments(comment.kids));
    }
  };

  return (
    <>
      {comment.parent === parentId ? (
        <div className={style.comment} onClick={onClick}>
          <div>{comment.text}</div>

          <div className={style['comment__answer-wrapper']}>
            <Typography color="text.secondary">
              <span className={style.comment__answer}>Ответов: </span> {comment.kids?.length || 0}
            </Typography>
          </div>

          <CommentsContainer parentId={comment.id} />
        </div>
      ) : null}
    </>
  );
};

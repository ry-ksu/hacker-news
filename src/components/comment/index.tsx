// Library
import React from 'react';
// Components
import { CommentsContainer } from 'containers/commentsContainer';
// Style
import { Typography } from '@mui/material';
import style from './style.module.css';
// Other
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchNestedComments } from 'store/nestedComments';
import { axiosController, restartAxiosController } from 'services/hnAPI';
import { IComment } from 'types';

export const Comment = ({ parentId, comment }: { parentId: number; comment: IComment }) => {
  const nestedComments = useAppSelector((state) => state.nestedComments.comments);
  const dispatch = useAppDispatch();

  const onClick = () => {
    axiosController.abort();
    restartAxiosController();
    if (comment.kids && nestedComments.findIndex((el) => el.parent === comment.id) === -1) {
      dispatch(fetchNestedComments(comment.kids));
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

          <CommentsContainer commentsState={nestedComments} parentId={comment.id} />
        </div>
      ) : null}
    </>
  );
};

import React from 'react';
import { IComment } from 'types';
import { CommentsContainer } from 'containers/commentsContainer';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchComments } from 'store/storyCommentsSlice';

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
        <>
          <div onClick={onClick}>{comment.text}</div>
          <CommentsContainer parentId={comment.id} />
        </>
      ) : null}
    </>
  );
};

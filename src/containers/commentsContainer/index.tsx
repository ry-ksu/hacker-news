import React from 'react';
import { useAppSelector } from 'hook';
import { Comment } from 'components/comment';

export const CommentsContainer = ({ parentId }: { parentId: number }) => {
  const comments = useAppSelector((state) => state.comments);

  return (
    <>
      {comments.comments.map((comment) => {
        return parentId && <Comment key={comment.id} parentId={parentId} comment={comment} />;
      })}
    </>
  );
};

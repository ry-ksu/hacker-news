import React from 'react';
import { useAppSelector } from 'hook';
import { Comment } from 'components/comment';

export const CommentsContainer = () => {
  const chosenStory = useAppSelector((state) => state.stories.chosenStory);
  const comments = useAppSelector((state) => state.comments);

  return (
    <>
      {comments.comments.map((comment) => {
        return (
          chosenStory && <Comment key={comment.id} parentId={chosenStory?.id} comment={comment} />
        );
      })}
    </>
  );
};

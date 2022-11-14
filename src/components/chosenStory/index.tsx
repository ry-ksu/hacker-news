import React from 'react';
import { useAppSelector } from 'hook';
import { CommentsContainer } from 'containers/commentsContainer';

export const ChosenStory = () => {
  const chosenStory = useAppSelector((state) => state.stories.chosenStory);
  const comments = useAppSelector((state) => state.comments);

  return (
    <>
      {chosenStory && (
        <div>
          <h3>{chosenStory.title}</h3>
          <a href={chosenStory.url}>{chosenStory.url}</a>
          <p>{String(new Date(chosenStory.time * 1000))}</p>
          <p>{chosenStory.by}</p>
          <p>Комментарии: {chosenStory.kids?.length || 0}</p>
        </div>
      )}
      {chosenStory && chosenStory.kids && comments.isLoaded === 'LOADED' && (
        <CommentsContainer parentId={chosenStory.id} />
      )}
    </>
  );
};

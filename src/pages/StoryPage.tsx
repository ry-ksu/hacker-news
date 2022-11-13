import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from 'hook';

export const StoryPage = () => {
  const chosenStory = useAppSelector((state) => state.stories.chosenStory);

  return (
    chosenStory && (
      <div>
        <h3>{chosenStory.title}</h3>
        <NavLink to={chosenStory.url}>{chosenStory.url}</NavLink>
        <p>{String(new Date(chosenStory.time * 1000))}</p>
        <p>{chosenStory.by}</p>
        <p>Комментарии: {chosenStory.kids?.length || 0}</p>
        {chosenStory.kids &&
          chosenStory.kids?.map((comment) => {
            return <p key={comment}>{comment}</p>;
          })}
      </div>
    )
  );
};

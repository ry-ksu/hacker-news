import React from 'react';
import { useAppSelector } from 'hook';
import { Story } from 'components/story';

export const StoriesContainer = () => {
  const stories = useAppSelector((state) => state.stories.stories);

  return (
    <>
      {stories.map((story) => {
        return <Story key={story.id} story={story} />;
      })}
    </>
  );
};

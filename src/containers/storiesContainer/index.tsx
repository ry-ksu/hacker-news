import React from 'react';
import { sortStories } from 'store/storySlice';
import { useAppDispatch, useAppSelector } from 'hook';
import { Story } from 'components/story';

export const StoriesContainer = () => {
  const stories = useAppSelector((state) => state.stories.stories);
  const dispatch = useAppDispatch();
  dispatch(sortStories());

  return (
    <>
      {stories.map((story) => {
        return <Story key={story.id} story={story} />;
      })}
    </>
  );
};

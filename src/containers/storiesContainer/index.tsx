import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchStoryIds } from 'store/storyIdsSlice';
import { Story } from 'components/story';

export const StoriesContainer = () => {
  const storyIdsState = useAppSelector((state) => state.storyIds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStoryIds());
  }, [dispatch]);

  return (
    <>
      {storyIdsState.storyIds.map((storyId) => {
        return <Story key={storyId} storyId={storyId} />;
      })}
    </>
  );
};

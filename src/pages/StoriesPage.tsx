import React, { useEffect, useCallback } from 'react';
import { StoriesContainer } from 'containers/storiesContainer';
import { Button } from 'components/button';

import { axiosController, restartAxiosController } from 'services/hnAPI';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchStoryIds } from 'store/storyIdsSlice';
import { fetchStories } from '../store/storiesSlice';

export const StoriesPage = () => {
  const storiesState = useAppSelector((state) => state.stories);
  const storyIdsState = useAppSelector((state) => state.storyIds);
  const dispatch = useAppDispatch();

  const btnContent = 'Обновить список новостей';
  const updateStories = useCallback(() => {
    axiosController.abort();
    restartAxiosController();
    dispatch(fetchStoryIds());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStoryIds());
    console.log(555);

    const interval = setInterval(() => {
      updateStories();
    }, 60000);

    return () => {
      clearInterval(interval);
      axiosController.abort();
      restartAxiosController();
    };
  }, [dispatch, updateStories]);

  useEffect(() => {
    console.log(999);
    if (storyIdsState.storyIds.length !== 0) {
      dispatch(fetchStories(storyIdsState.storyIds));
      console.log(99955);
    }
  }, [dispatch, storyIdsState.storyIds]);

  return (
    <>
      <h1>Hacker News</h1>
      <Button content={btnContent} onClick={updateStories} />
      {storiesState.isLoaded === 'LOADED' && <StoriesContainer />}
    </>
  );
};

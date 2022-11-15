import React, { useEffect, useCallback } from 'react';
import { StoriesContainer } from 'containers/storiesContainer';
import { Btn } from 'components/button';
import { Loader } from 'components/loader';
import { Container, Typography } from '@mui/material';

import { axiosController, restartAxiosController } from 'services/hnAPI';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchStoryIds, removeStoryIds } from 'store/storyIdsSlice';
import { fetchStories } from '../store/storiesSlice';

import style from './style.module.css';

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
      dispatch(removeStoryIds());
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

  let content = <Loader page="storiesPage" />;

  if (storiesState.isLoaded === 'LOADED') {
    content = <StoriesContainer />;
  }

  return (
    <div className={style['page-container']} data-testid="storiesPage/container">
      <Container>
        <Typography data-testid="storiesPage/header" variant="h2" gutterBottom>
          Hacker News
        </Typography>

        <div data-testid="storiesPage/button">
          <Btn variant="outlined" content={btnContent} onClick={updateStories} />
        </div>

        {content}
      </Container>
    </div>
  );
};

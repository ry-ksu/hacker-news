import React, { useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchComments, removeComments } from 'store/storyCommentsSlice';
import { useAppDispatch, useAppSelector } from 'hook';
import { axiosController, restartAxiosController } from 'services/hnAPI';
import { Btn } from 'components/button';
import { ChosenStory } from 'components/chosenStory';
import { Typography, Container } from '@mui/material';

import style from './style.module.css';

export const StoryPage = () => {
  const chosenStory = useAppSelector((state) => state.stories.chosenStory);
  const dispatch = useAppDispatch();

  const btnContent = 'Обновить комментарии';
  const navLinkContent = 'К главной странице';

  const updateComments = useCallback(() => {
    if (chosenStory && chosenStory.kids) {
      axiosController.abort();
      restartAxiosController();
      dispatch(removeComments());
      dispatch(fetchComments(chosenStory.kids));
    }
  }, [chosenStory, dispatch]);

  useEffect(() => {
    if (chosenStory && chosenStory.kids) {
      dispatch(fetchComments(chosenStory.kids));
    }

    return () => {
      dispatch(removeComments());
      axiosController.abort();
      restartAxiosController();
    };
  }, [chosenStory, dispatch]);

  return (
    <div className={style['page-container']}>
      <Container>
        <Typography variant="h2" gutterBottom>
          Страница новости
        </Typography>

        <div className={style['story-page_buttons']}>
          <NavLink to="/">
            <Btn variant="outlined" content={navLinkContent} onClick={() => {}} />
          </NavLink>

          <Btn variant="text" content={btnContent} onClick={updateComments} />
        </div>

        {chosenStory && <ChosenStory />}
      </Container>
    </div>
  );
};

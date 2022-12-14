// Library
import React, { useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
// Components
import { ChosenStory } from 'components/chosenStory';
import { Btn } from 'components/button';
import { Warning } from 'components/warning';
// Style
import { Typography, Container } from '@mui/material';
import style from './style.module.css';
// Other
import { fetchStory } from 'store/chosenStory';
import { fetchTopComments, removeComments } from 'store/topCommentsSlice';
import { removeNestedComments } from 'store/nestedComments';
import { useAppDispatch, useAppSelector } from 'hook';
import { axiosController, restartAxiosController } from 'services/hnAPI';

type IMatch = {
  isExact: boolean;
  params: {
    id: string;
  };
  path: string;
  url: string;
};

export const StoryPage = ({ match }: { match?: IMatch }) => {
  const dispatch = useAppDispatch();
  const chosenStory = useAppSelector((state) => state.chosenStory);

  let id: null | string = null;
  if (match) id = match.params.id;

  useEffect(() => {
    if (id) {
      dispatch(fetchStory(Number(id)));
    }

    return () => {
      dispatch(removeComments());
      axiosController.abort();
      restartAxiosController();
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (chosenStory.story && chosenStory.story.kids) {
      dispatch(fetchTopComments(chosenStory.story.kids));
    }
  }, [chosenStory, dispatch]);

  const btnContent = 'Обновить комментарии';
  const navLinkContent = 'К главной странице';

  const updateComments = useCallback(() => {
    if (chosenStory.story && chosenStory.story.kids) {
      axiosController.abort();
      restartAxiosController();
      dispatch(removeNestedComments());
      dispatch(removeComments());
      dispatch(fetchTopComments(chosenStory.story.kids));
    }
  }, [chosenStory, dispatch]);

  let content = <Warning warning="Пожалуйста, перейдите на Главную страницу и выберете новость." />;

  if (chosenStory) {
    content = <ChosenStory />;
  }

  setTimeout(() => window.scrollTo(0, 0), 0);

  return (
    <div className={style['page-container']} data-testid="storyPage/container">
      <Container>
        <Typography data-testid="storyPage/header" variant="h2" gutterBottom>
          Страница новости
        </Typography>

        <div data-testid="storyPage/buttons" className={style['story-page_buttons']}>
          <NavLink to="/">
            <Btn variant="outlined" content={navLinkContent} onClick={() => {}} />
          </NavLink>

          <Btn variant="text" content={btnContent} onClick={updateComments} />
        </div>

        {content}
      </Container>
    </div>
  );
};

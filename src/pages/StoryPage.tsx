import React, { useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { fetchComments, removeComments } from 'store/storyCommentsSlice';
import { useAppDispatch, useAppSelector } from 'hook';
import { axiosController, restartAxiosController } from 'services/hnAPI';
import { Button } from 'components/button';
import { ChosenStory } from 'components/chosenStory';

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
    <>
      <NavLink to="/">
        <Button content={navLinkContent} onClick={() => {}} />
      </NavLink>
      <h1>Выбранная новость</h1>
      <Button content={btnContent} onClick={updateComments} />
      {chosenStory && <ChosenStory />}
    </>
  );
};

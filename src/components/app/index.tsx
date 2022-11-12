import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { StoriesPage } from '../../pages/StoriesPage';
import { StoryPage } from '../../pages/StoryPage';
import { Layout } from '../../layout';

import { axiosController, restartAxiosController } from 'services/hnAPI';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchStory, removeStories } from 'store/storySlice';
import { fetchStoryIds } from 'store/storyIdsSlice';

function App() {
  const storyIdsState = useAppSelector((state) => state.storyIds);
  const dispatch = useAppDispatch();

  const updateStories = () => {
    axiosController.abort();
    restartAxiosController();
    dispatch(removeStories());
    dispatch(fetchStoryIds());
  };

  useEffect(() => {
    dispatch(fetchStoryIds());
    console.log(555);

    setInterval(() => {
      updateStories();
    }, 10000);
  }, [dispatch]);

  useEffect(() => {
    for (let i = 0; i < storyIdsState.storyIds.length; i++) {
      dispatch(fetchStory(storyIdsState.storyIds[i]));
      console.log(999);
    }
  }, [dispatch, storyIdsState.storyIds]);

  const wrappedStoriesPage = () => {
    return <StoriesPage onClickBtn={updateStories} />;
  };

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={wrappedStoriesPage} />
          <Route path="/story" component={StoryPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

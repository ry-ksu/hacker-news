import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { StoriesPage } from '../../pages/StoriesPage';
import { StoryPage } from '../../pages/StoryPage';
import { Layout } from '../../layout';

import { axiosController, restartAxiosController } from 'services/hnAPI';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchStory, removeStories, sortStories, changeLoading } from 'store/storySlice';
import { fetchStoryIds } from 'store/storyIdsSlice';

function App() {
  const storyIdsState = useAppSelector((state) => state.storyIds);
  // const storiesState = useAppSelector((state) => state.stories);
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
    }, 60000);
  }, [dispatch]);

  useEffect(() => {
    (async (array: Array<number>) => {
      const promises = array.map((elem) => {
        dispatch(fetchStory(elem));
      });
      await Promise.all(promises)
        .then(() => dispatch(sortStories()))
        .then(() => dispatch(changeLoading('LOADED')));
      console.log('done');
    })(storyIdsState.storyIds);
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

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { StoriesPage } from '../../pages/StoriesPage';
import { StoryPage } from '../../pages/StoryPage';
import { Layout } from '../../layout';

import { useAppDispatch, useAppSelector } from 'hook';
import { fetchStory } from 'store/storySlice';
import { fetchStoryIds } from 'store/storyIdsSlice';

function App() {
  const storyIdsState = useAppSelector((state) => state.storyIds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStoryIds());
    console.log(555);
  }, [dispatch]);

  useEffect(() => {
    for (let i = 0; i < storyIdsState.storyIds.length; i++) {
      dispatch(fetchStory(storyIdsState.storyIds[i]));
      console.log(999);
    }
  }, [dispatch, storyIdsState.storyIds]);

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={StoriesPage} />
          <Route path="/story" component={StoryPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

// Library
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Components
import { NotFoundPage } from '../../pages/NotFoundPage';
import { StoriesPage } from '../../pages/StoriesPage';
import { StoryPage } from '../../pages/StoryPage';
import { Layout } from '../../layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={StoriesPage} />
          <Route exact path="/story" component={StoryPage} />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { StoriesContainer } from 'containers/storiesContainer';
import { Button } from 'components/button';

type IStoriesPage = {
  onClickBtn: () => void;
};

export const StoriesPage = (props: IStoriesPage) => {
  const btnContent = 'Обновить список новостей';

  return (
    <>
      <h1>Hacker News</h1>
      <Button content={btnContent} onClick={props.onClickBtn} />
      <StoriesContainer />
    </>
  );
};

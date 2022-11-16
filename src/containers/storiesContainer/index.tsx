import React from 'react';
import { useAppSelector } from 'hook';
import { Story } from 'components/story';
import { Container } from '@mui/material';
import style from './style.module.css';

export const StoriesContainer = () => {
  const stories = useAppSelector((state) => state.stories.stories);

  return (
    <div className={style['stories-container']}>
      <Container>
        {stories.map((story) => {
          return <Story key={story.id} story={story} />;
        })}
      </Container>
    </div>
  );
};

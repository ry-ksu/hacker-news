import React from 'react';
import { useAppSelector } from 'hook';
import { Story } from 'components/story';
import { Container } from '@mui/material';

export const StoriesContainer = () => {
  const stories = useAppSelector((state) => state.stories.stories);

  return (
    <Container sx={{ mt: 3 }}>
      {stories.map((story) => {
        return <Story key={story.id} story={story} />;
      })}
    </Container>
  );
};

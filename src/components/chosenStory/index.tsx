import React from 'react';
import { useAppSelector } from 'hook';
import { CommentsContainer } from 'containers/commentsContainer';
import { Card, CardContent, Typography, Container } from '@mui/material';
import { dateMapping } from 'mapping/dateMapping';

import style from './style.module.css';

export const ChosenStory = () => {
  const chosenStory = useAppSelector((state) => state.stories.chosenStory);
  const comments = useAppSelector((state) => state.comments);

  return (
    <>
      {chosenStory && (
        <div className={style['chosen-story-container']}>
          <Container>
            <Card>
              <CardContent>
                <Typography variant="h5" color="text.primary">
                  {chosenStory.title}
                </Typography>

                <a href={chosenStory.url}>
                  <Typography color="primary.main" gutterBottom>
                    {chosenStory.url}
                  </Typography>
                </a>

                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  <strong>Автор: </strong> {chosenStory.by}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  <strong>Дата публикации: </strong> {dateMapping(chosenStory.time)}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  <strong>Комментарии: </strong> {chosenStory.kids?.length || 0}
                </Typography>

                {chosenStory.kids && comments.isLoaded === 'LOADED' && (
                  <CommentsContainer parentId={chosenStory.id} />
                )}
              </CardContent>
            </Card>
          </Container>
        </div>
      )}
    </>
  );
};

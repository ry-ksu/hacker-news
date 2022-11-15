import React from 'react';
import { useAppSelector } from 'hook';
import { CommentsContainer } from 'containers/commentsContainer';
import { Card, CardContent, Typography, Container } from '@mui/material';
import { dateMapping } from 'mapping/dateMapping';

import style from './style.module.css';
import { Loader } from 'components/loader';

export const ChosenStory = () => {
  const chosenStory = useAppSelector((state) => state.stories.chosenStory);
  const comments = useAppSelector((state) => state.comments);

  let content = <></>;

  if (chosenStory && chosenStory.kids && comments.isLoaded === 'LOADED') {
    content = <CommentsContainer commentsState={comments.comments} parentId={chosenStory.id} />;
  } else if (comments.isLoaded === 'LOADING') {
    content = <Loader page="storyPage" />;
  }

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

                {content}
              </CardContent>
            </Card>
          </Container>
        </div>
      )}
    </>
  );
};

import React from 'react';
import { NavLink } from 'react-router-dom';
import { addChosenStory } from 'store/storiesSlice';
import { useAppDispatch, useAppSelector } from 'hook';
import { IStory } from 'types';
import { Card, CardContent, Typography, Badge } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ForumIcon from '@mui/icons-material/Forum';

type IStoryProp = {
  story: IStory;
};

export const Story = (prop: IStoryProp) => {
  const dispatch = useAppDispatch();
  const stories = useAppSelector((state) => state.stories.stories);

  const date = (date: number) => {
    const result = new Date(date * 1000).toString();
    return result.slice(0, 24);
  };

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const storyIndex = Number(e.currentTarget.dataset.id);
    const index = stories.findIndex((el) => el.id === storyIndex);
    dispatch(addChosenStory(stories[index]));
    console.log(111);
  };

  return prop.story && prop.story.url ? (
    <Card data-id={prop.story.id} onClick={onClick} sx={{ mb: 2 }}>
      <NavLink to="/story">
        <CardContent sx={{ position: 'relative' }}>
          <Typography variant="h5" sx={{ color: 'rgba(0, 0, 0, 0.87)' }}>
            {prop.story.title}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" component="span" gutterBottom>
            <strong>By: </strong> {prop.story.by}
          </Typography>

          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            component="span"
            gutterBottom
            ml={1}
          >
            <strong>Posted: </strong> {date(prop.story.time)}
          </Typography>

          <Badge
            badgeContent={prop.story.score}
            color="primary"
            sx={{ position: 'absolute', right: '70px', bottom: '40px' }}
          >
            <ThumbUpIcon color="action" sx={{ position: 'absolute', top: '3px', right: '3px' }} />
          </Badge>

          <Badge
            badgeContent={prop.story.kids?.length}
            color="primary"
            sx={{ position: 'absolute', right: '30px', bottom: '16px' }}
          >
            <ForumIcon color="action" sx={{ position: 'relative', top: '3px', right: '3px' }} />
          </Badge>
        </CardContent>
      </NavLink>
    </Card>
  ) : null;
};

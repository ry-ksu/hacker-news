// Library
import React from 'react';
import { NavLink } from 'react-router-dom';
// Style
import { Card, CardContent, Typography, Badge } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ForumIcon from '@mui/icons-material/Forum';
import style from './style.module.css';
// Other
import { IStory } from 'types';
import { dateMapping } from 'mapping/dateMapping';

type IStoryProp = {
  story: IStory;
};

export const Story = (prop: IStoryProp) => {
  return prop.story && prop.story.url ? (
    <div className={style.card}>
      <Card>
        <NavLink to={`/story/${prop.story.id}`}>
          <div className={style['card-content']}>
            <CardContent>
              <Typography variant="h5" color="text.primary">
                {prop.story.title}
              </Typography>

              <div className={style['card-content_by']}>
                <Typography color="text.secondary" component="span" gutterBottom>
                  <strong>Автор: </strong> {prop.story.by}
                </Typography>
              </div>

              <div className={style['card-content_posted']}>
                <Typography color="text.secondary" component="span" gutterBottom>
                  <strong>Дата публикации: </strong> {dateMapping(prop.story.time)}
                </Typography>
              </div>

              <div className={style['badge_rating']}>
                <Badge badgeContent={prop.story.score} color="primary">
                  <div className={style.icon}>
                    <ThumbUpIcon color="action" />
                  </div>
                </Badge>
              </div>

              <div className={style['badge_comment']}>
                <Badge badgeContent={prop.story.kids?.length} color="primary">
                  <div className={style.icon}>
                    <ForumIcon color="action" />
                  </div>
                </Badge>
              </div>
            </CardContent>
          </div>
        </NavLink>
      </Card>
    </div>
  ) : null;
};

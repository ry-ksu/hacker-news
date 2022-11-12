import React from 'react';
import { IStory } from 'types';

type IStoryProp = {
  story: IStory;
};

export const Story = (prop: IStoryProp) => {
  // console.log(1);
  return prop.story && prop.story.url ? (
    <div>
      <h3>{prop.story.title}</h3>
      <p>{prop.story.score}</p>
      <p>{prop.story.by}</p>
      <p>{prop.story.time}</p>
    </div>
  ) : null;
};

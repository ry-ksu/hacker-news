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
      <p>{String(new Date(prop.story.time * 1000))}</p>
    </div>
  ) : null;
};

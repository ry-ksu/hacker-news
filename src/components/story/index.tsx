import React, { useEffect, useState } from 'react';
import { getStory } from '../../services/hnAPI';
import { IStory } from 'types';

type IStoryProp = {
  storyId: number;
};

export const Story = (prop: IStoryProp) => {
  const [story, setStory] = useState<IStory | Record<string, never>>({});

  useEffect(() => {
    getStory(prop.storyId).then((data) => data && data.url && setStory(data));
  }, [prop.storyId]);

  console.log(1);
  return story && story.url ? (
    <>
      <h3>{story.title}</h3>
      <p>{story.score}</p>
      <p>{story.by}</p>
      <p>{story.time}</p>
    </>
  ) : null;
};

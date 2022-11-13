import React from 'react';
import { NavLink } from 'react-router-dom';
import { addChosenStory } from 'store/storiesSlice';
import { useAppDispatch, useAppSelector } from 'hook';
import { IStory } from 'types';

type IStoryProp = {
  story: IStory;
};

export const Story = (prop: IStoryProp) => {
  const dispatch = useAppDispatch();
  const stories = useAppSelector((state) => state.stories.stories);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const storyIndex = Number(e.currentTarget.dataset.id);
    const index = stories.findIndex((el) => el.id === storyIndex);
    dispatch(addChosenStory(stories[index]));
    console.log(111);
  };

  return prop.story && prop.story.url ? (
    <NavLink to="/story">
      <div data-id={prop.story.id} onClick={onClick}>
        <h3>{prop.story.title}</h3>
        <p>{prop.story.score}</p>
        <p>{prop.story.by}</p>
        <p>{String(new Date(prop.story.time * 1000))}</p>
      </div>
    </NavLink>
  ) : null;
};

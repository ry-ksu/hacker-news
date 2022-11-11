import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchStoryIds } from 'store/storyIdsSlice';

function App() {
  const storyIdsState = useAppSelector((state) => state.storyIds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchStoryIds());
  }, [dispatch]);

  return (
    <>
      {storyIdsState.storyIds.map((value, i) => {
        return <p key={i}>{value}</p>;
      })}
    </>
  );
}

export default App;

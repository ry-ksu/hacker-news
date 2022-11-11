import { configureStore } from '@reduxjs/toolkit';
import storyIdsReducer from './storyIdsSlice';
import storiesReducer from './storySlice';

const store = configureStore({
  reducer: {
    storyIds: storyIdsReducer,
    stories: storiesReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

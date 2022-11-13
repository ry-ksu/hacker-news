import { configureStore } from '@reduxjs/toolkit';
import storyIdsReducer from './storyIdsSlice';
import storiesReducer from './storiesSlice';
import commentsReducer from './storyCommentsSlice';

const store = configureStore({
  reducer: {
    storyIds: storyIdsReducer,
    stories: storiesReducer,
    comments: commentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

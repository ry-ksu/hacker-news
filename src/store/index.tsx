import { configureStore } from '@reduxjs/toolkit';
import storyIdsReducer from './storyIdsSlice';
import storiesReducer from './storiesSlice';
import commentsReducer from './topCommentsSlice';
import nestedCommentsReducer from './nestedComments';

const store = configureStore({
  reducer: {
    storyIds: storyIdsReducer,
    stories: storiesReducer,
    comments: commentsReducer,
    nestedComments: nestedCommentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import storyIdsReducer from './storyIdsSlice';
import storiesReducer from './storiesSlice';
import commentsReducer from './topCommentsSlice';
import nestedCommentsReducer from './nestedComments';
import chosenStoryReducer from './chosenStory';

const store = configureStore({
  reducer: {
    storyIds: storyIdsReducer,
    stories: storiesReducer,
    chosenStory: chosenStoryReducer,
    comments: commentsReducer,
    nestedComments: nestedCommentsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

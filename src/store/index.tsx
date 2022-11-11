import { configureStore } from '@reduxjs/toolkit';
import storyIdsReducer from './storyIdsSlice';

const store = configureStore({
  reducer: {
    storyIds: storyIdsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

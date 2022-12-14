import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IStoryIdsState } from 'types';
import { getStoryIds } from 'services/hnAPI';

export const fetchStoryIds = createAsyncThunk<Array<number>, undefined, { rejectValue: string }>(
  'storyIds/fetchStoryIds',
  async function (_, { rejectWithValue }) {
    try {
      const response = await getStoryIds();
      return response;
    } catch (error) {
      return rejectWithValue('Failed to get id list of news.');
    }
  }
);

const storyIdsInitialState: IStoryIdsState = {
  storyIds: [],
  isLoaded: 'NOT_LOADED',
  error: null,
};

const storyIdsSlice = createSlice({
  name: 'storyIds',
  initialState: storyIdsInitialState,
  reducers: {
    removeStoryIds(state) {
      state.storyIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStoryIds.pending, (state) => {
        state.isLoaded = 'LOADING';
        state.storyIds = [];
        state.error = null;
      })
      .addCase(fetchStoryIds.fulfilled, (state, action) => {
        state.isLoaded = 'LOADED';
        state.storyIds = action.payload.filter((i) => i != null);
        const endValue = 100;
        state.storyIds = state.storyIds.slice(0, endValue);
      })
      .addCase(fetchStoryIds.rejected, (state) => {
        state.isLoaded = 'REJECTED';
        state.error = 'Something was wrong. Failed to get id list of news.';
      });
  },
});

export default storyIdsSlice.reducer;
export const { removeStoryIds } = storyIdsSlice.actions;

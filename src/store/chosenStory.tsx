import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IStory } from 'types';
import { getStory } from 'services/hnAPI';

type IStoryInitialState = {
  isLoaded: string;
  story: null | IStory;
  error: string;
};

const storyInitialState: IStoryInitialState = {
  isLoaded: 'NOT_LOADED',
  story: null,
  error: '',
};

export const fetchStory = createAsyncThunk<IStory, number, { rejectValue: string }>(
  'story/fetchStory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getStory(id);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to get news.');
    }
  }
);

const storySlice = createSlice({
  name: 'story',
  initialState: storyInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStory.pending, (state) => {
        state.isLoaded = 'LOADING';
        state.story = null;
        state.error = '';
      })
      .addCase(fetchStory.fulfilled, (state, action) => {
        state.story = action.payload;
        state.isLoaded = 'LOADED';
      })
      .addCase(fetchStory.rejected, (state) => {
        state.isLoaded = 'REJECTED';
        state.error = 'Something was wrong. Failed to get list of news.';
      });
  },
});

export default storySlice.reducer;

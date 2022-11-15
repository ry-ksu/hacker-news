import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IStoriesState, IStory } from 'types';
import { getStory } from 'services/hnAPI';

const storiesInitialState: IStoriesState = {
  stories: [],
  isLoaded: 'NOT_LOADED',
  error: '',
  chosenStory: null,
};

export const fetchStories = createAsyncThunk<IStory[], number[], { rejectValue: string }>(
  'stories/fetchStories',
  async (array, { rejectWithValue }) => {
    let result: IStory[] = [];
    try {
      await Promise.all(array.map((id) => getStory(id))).then((data) => (result = data));
      return result;
    } catch (error) {
      return rejectWithValue('Failed to get list of news.');
    }
  }
);

const storiesSlice = createSlice({
  name: 'stories',
  initialState: storiesInitialState,
  reducers: {
    addChosenStory(state, action) {
      state.chosenStory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.isLoaded = 'LOADING';
        state.stories = [];
        state.error = '';
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.stories = action.payload;
        state.stories.filter((elem) => elem != null);
        state.stories.sort((a, b) => b.time - a.time);
        state.isLoaded = 'LOADED';
      })
      .addCase(fetchStories.rejected, (state) => {
        state.isLoaded = 'REJECTED';
        state.error = 'Something was wrong. Failed to get list of news.';
      });
  },
});

export const { addChosenStory } = storiesSlice.actions;
export default storiesSlice.reducer;

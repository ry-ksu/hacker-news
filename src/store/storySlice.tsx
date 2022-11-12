import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IStoriesState, IStory } from 'types';
import { getStory } from 'services/hnAPI';

export const fetchStory = createAsyncThunk<IStory, number, { rejectValue: string }>(
  'story/fetchStory',
  async function (id, { rejectWithValue }) {
    try {
      const response = await getStory(id);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to get story.');
    }
  }
);

const storiesInitialState: IStoriesState = {
  stories: [],
  isLoading: 'NOT_LOADED',
};

const storySlice = createSlice({
  name: 'story',
  initialState: storiesInitialState,
  reducers: {
    removeStories(state) {
      state.stories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStory.pending, () => {})
      .addCase(fetchStory.fulfilled, (state, action) => {
        state.stories.push(action.payload);
      })
      .addCase(fetchStory.rejected, () => {});
  },
});

export const { removeStories } = storySlice.actions;
export default storySlice.reducer;

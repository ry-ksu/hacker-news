import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IStoriesState, IStory } from 'types';
import { getStory } from 'services/hnAPI';

// export const fetchStory = createAsyncThunk<IStory, number, { rejectValue: string }>(
//   'story/fetchStory',
//   async function (id, { rejectWithValue }) {
//     try {
//       const response = await getStory(id);
//       return response;
//     } catch (error) {
//       return rejectWithValue('Failed to get story.');
//     }
//   }
// );

const storiesInitialState: IStoriesState = {
  stories: [],
  isLoaded: 'NOT_LOADED',
  error: '',
  chosenStory: null,
};

// const storySlice = createSlice({
//   name: 'story',
//   initialState: storiesInitialState,
//   reducers: {
//     removeStories(state) {
//       state.stories = [];
//     },
//     sortStories(state) {
//       state.stories.sort((a, b) => b.time - a.time);
//     },
//     changeLoading(state, action) {
//       state.isLoading = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStory.pending, () => {})
//       .addCase(fetchStory.fulfilled, (state, action) => {
//         state.stories.push(action.payload);
//       })
//       .addCase(fetchStory.rejected, () => {});
//   },
// });

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
        console.log('end fetch', state.stories);
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

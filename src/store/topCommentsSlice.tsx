import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentState, IComment } from 'types';
import { getStory } from 'services/hnAPI';

const topCommentsInitialState: ICommentState = {
  comments: [],
  isLoaded: 'NOT_LOADED',
  error: '',
};

export const fetchTopComments = createAsyncThunk<IComment[], number[], { rejectValue: string }>(
  'topComments/fetchComments',
  async (array, { rejectWithValue }) => {
    let result: IComment[] = [];
    try {
      await Promise.all(array.map((id) => getStory(id))).then((data) => (result = data));
      return result;
    } catch (error) {
      return rejectWithValue('Failed to get list of news.');
    }
  }
);

const commentsSlice = createSlice({
  name: 'topComments',
  initialState: topCommentsInitialState,
  reducers: {
    removeComments(state) {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopComments.pending, (state) => {
        state.isLoaded = 'LOADING';
        state.error = '';
      })
      .addCase(fetchTopComments.fulfilled, (state, action) => {
        state.isLoaded = 'LOADED';
        state.comments = [...state.comments, ...action.payload];
      })
      .addCase(fetchTopComments.rejected, (state) => {
        state.isLoaded = 'REJECTED';
        state.error = 'Something was wrong. Failed to get list of comments.';
      });
  },
});

export default commentsSlice.reducer;
export const { removeComments } = commentsSlice.actions;

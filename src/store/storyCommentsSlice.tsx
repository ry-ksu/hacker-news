import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentState, IComment } from 'types';
import { getStory } from 'services/hnAPI';

const commentsInitialState: ICommentState = {
  comments: [],
  isLoaded: 'NOT_LOADED',
  error: '',
};

export const fetchComments = createAsyncThunk<IComment[], number[], { rejectValue: string }>(
  'comments/fetchComments',
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
  name: 'comments',
  initialState: commentsInitialState,
  reducers: {
    removeComments(state) {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoaded = 'LOADING';
        state.error = '';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoaded = 'LOADED';
        state.comments = [...state.comments, ...action.payload];
        console.log('end comments', action.payload);
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoaded = 'REJECTED';
        state.error = 'Something was wrong. Failed to get list of comments.';
      });
  },
});

export default commentsSlice.reducer;
export const { removeComments } = commentsSlice.actions;

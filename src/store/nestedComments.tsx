import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ICommentState, IComment } from 'types';
import { getStory } from 'services/hnAPI';

const nestedCommentsInitialState: ICommentState = {
  comments: [],
  isLoaded: 'NOT_LOADED',
  error: '',
};

export const fetchNestedComments = createAsyncThunk<IComment[], number[], { rejectValue: string }>(
  'nestedComments/fetchComments',
  async (array, { rejectWithValue }) => {
    let result: IComment[] = [];
    try {
      const fn = async (arr: number[]) => {
        await Promise.all(arr.map((id) => getStory(id))).then(async (data) => {
          result = [...result, ...data];

          await Promise.all(data.map(async (comment) => comment.kids && (await fn(comment.kids))));
        });
      };

      await fn(array);

      return result;
    } catch (error) {
      return rejectWithValue('Failed to get list of news.');
    }
  }
);

const commentsSlice = createSlice({
  name: 'nestedComments',
  initialState: nestedCommentsInitialState,
  reducers: {
    removeNestedComments(state) {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNestedComments.pending, (state) => {
        state.isLoaded = 'LOADING';
        state.error = '';
      })
      .addCase(fetchNestedComments.fulfilled, (state, action) => {
        state.isLoaded = 'LOADED';
        state.comments = [...state.comments, ...action.payload];
      })
      .addCase(fetchNestedComments.rejected, (state) => {
        state.isLoaded = 'REJECTED';
        state.error = 'Something was wrong. Failed to get list of comments.';
      });
  },
});

export default commentsSlice.reducer;
export const { removeNestedComments } = commentsSlice.actions;

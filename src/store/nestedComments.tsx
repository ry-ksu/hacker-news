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
      const getNestedComments = async (arr: number[]) => {
        await Promise.all(arr.map((id) => getStory(id))).then(async (data) => {
          result = [...result, ...data];

          await Promise.all(data.map((comment) => comment.kids && getNestedComments(comment.kids)));
        });
      };

      await getNestedComments(array);

      return result;
    } catch (error) {
      return rejectWithValue('Failed to get list of nested comments.');
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
        state.comments = [...state.comments, ...action.payload.filter((i) => i != null)];
      })
      .addCase(fetchNestedComments.rejected, (state) => {
        state.isLoaded = 'REJECTED';
        state.error = 'Something was wrong. Failed to get list of nested comments.';
      });
  },
});

export default commentsSlice.reducer;
export const { removeNestedComments } = commentsSlice.actions;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import IPost from '../../models/IPost';

interface PostState {
  post: IPost | null;
  posts: IPost[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: PostState = {
  post: null,
  posts: [],
  loading: 'idle',
};

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (search: string) => {
    const response = await axios.get('/api/posts', { params: { search } });
    return response.data;
  }
);

export const fetchPost = createAsyncThunk(
  'posts/fetchPost',
  async (id: string) => {
    const response = await axios.get(`/api/posts/${id}`);
    return response.data;
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ title, text }: { title: string; text: string }) => {
    const response = await axios.post('/api/posts', { title, text });
    return response.data;
  }
);

const postsReducer = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.post = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.posts = [];
      state.loading = 'pending';
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts = [];
      state.loading = 'failed';
    });
    builder.addCase(fetchPost.pending, (state, action) => {
      state.post = null;
      state.loading = 'pending';
    });
    builder.addCase(fetchPost.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchPost.rejected, (state, action) => {
      state.post = null;
      state.loading = 'failed';
    });
  },
});

export const { setPost } = postsReducer.actions;

export default postsReducer.reducer;

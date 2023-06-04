import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoviesState {
  loading: boolean;
  reviews: Review[];
  movie?: Movie;
  error?: string;
  editingId?: string;
  mutation: {
    loading: boolean;
    error?: string;
  };
}

const initialState: MoviesState = {
  loading: false,
  reviews: [],
  mutation: {
    loading: false,
  },
};

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetch: (state, action: PayloadAction<{ id: string }>) => {
      state.loading = true;
    },
    loaded: (
      state,
      action: PayloadAction<{
        data: { reviews: QueryList<Review>; movie: Movie };
      }>
    ) => {
      state.reviews = action.payload.data.reviews.nodes;
      state.movie = action.payload.data.movie;
      state.error = undefined;
      state.loading = false;
    },
    loadError: (state) => {
      state.error = 'Error fetching :(';
      state.loading = false;
    },
    add: (
      state,
      action: PayloadAction<
        Omit<Review, 'id' | 'userByUserReviewerId'> & {
          userId: string;
          movieId: string;
        }
      >
    ) => {
      state.mutation = { loading: true };
    },
    added: (state, action: PayloadAction<Review>) => {
      state.mutation = { loading: false };
      state.reviews = [action.payload, ...state.reviews];
    },
    addError: (state, action: PayloadAction<string>) => {
      state.mutation = { loading: false, error: action.payload };
    },
    delete: (state, action: PayloadAction<{ id: string }>) => {},
    deleted: (state, action: PayloadAction<{ id: string }>) => {
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload.id
      );
    },
    editing: (state, action: PayloadAction<string | undefined>) => {
      state.editingId = action.payload;
    },
    update: (
      state,
      action: PayloadAction<Omit<Review, 'id' | 'userByUserReviewerId'>>
    ) => {
      state.mutation = { loading: true };
    },
    updated: (
      state,
      action: PayloadAction<Omit<Review, 'userByUserReviewerId'>>
    ) => {
      state.editingId = undefined;
      state.mutation = { loading: false };
      state.reviews = state.reviews.map((review) =>
        review.id === action.payload.id
          ? { ...review, ...action.payload }
          : review
      );
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;

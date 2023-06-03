import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoviesState {
  loading: boolean;
  reviews: Review[];
  movie?: Movie;
  error?: string;
}

const initialState: MoviesState = {
  loading: false,
  reviews: [],
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
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MoviesState {
  loading: boolean;
  data: QueryList<Movie>['nodes'];
  error?: string;
}

const initialState: MoviesState = {
  loading: false,
  data: [],
};

export const slice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    fetch: (state) => {
      state.loading = true;
    },
    loaded: (
      state,
      action: PayloadAction<{ data: { allMovies: QueryList<Movie> } }>
    ) => {
      state.data = action.payload.data.allMovies.nodes;
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

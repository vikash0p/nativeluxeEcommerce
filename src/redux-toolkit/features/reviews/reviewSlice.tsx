import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface ReviewState {
  rating: number;
  comment: string;
}

const initialState: ReviewState = {
  rating: 0,
  comment: '',
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setComment: (state, action: PayloadAction<string>) => {
      state.comment = action.payload;
    },
    resetReview: () => initialState, // Optional: reset the review state
  },
});

export const {setRating, setComment, resetReview} = reviewSlice.actions;
export default reviewSlice.reducer;

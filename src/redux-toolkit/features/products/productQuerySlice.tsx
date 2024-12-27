import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ProductQueryParams} from '../../types';

interface ProductQueryState {
  params: ProductQueryParams; // Temporary filter selections
  appliedFilters: ProductQueryParams; // Filters that are applied
  loading: boolean;
}

const initialState: ProductQueryState = {
  params: {}, // Represents current filter state before applying
  appliedFilters: {}, // Represents the confirmed applied filter state
  loading: false,
};

// Reusable utility function
function toggleValueInArray<T>(array: T[], value: T): T[] {
  return array.includes(value)
    ? array.filter(item => item !== value)
    : [...array, value];
}

const productQuerySlice = createSlice({
  name: 'productQuery',
  initialState,
  reducers: {
    // Updates params with the provided filter values
    setParams: (state, action: PayloadAction<ProductQueryParams>) => {
      state.params = {...state.params, ...action.payload};
    },

    // Toggles a value in the array of a specific filter type
    toggleFilter(
      state,
      action: PayloadAction<{filterType: string; value: string}>,
    ) {
      const {filterType, value} = action.payload;

      // Ensure the filterType exists in state.params and is an array
      (state.params[filterType as keyof ProductQueryParams] as string[]) =
        toggleValueInArray(
          (state.params[filterType as keyof ProductQueryParams] as string[]) ||
            [],
          value,
        );
    },

    // Resets all filters back to the initial empty state
    resetParams: state => {
      state.params = {};
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    // Applies the current params to the appliedFilters and clears params
    applyFilters: state => {
      state.appliedFilters = {...state.params};
    },
  },
});

export const {setParams, resetParams, toggleFilter, applyFilters, setLoading} =
  productQuerySlice.actions;

export default productQuerySlice.reducer;

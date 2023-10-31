import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface FilterState {
  status: boolean;
  priceRange: number;
  category: string;
}

// Define the initial state using that type
const initialState: FilterState = {
  status: true,
  priceRange: 300,
  category: 'Self-Help',
};

export const filterSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateStatus: (state) => {
      state.status = !state.status;
    },
    filterPriceRange: (state, action: PayloadAction<number>) => {
      state.priceRange = action.payload;
    },
    filterCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { updateStatus, filterCategory, filterPriceRange } =
  filterSlice.actions;

export default filterSlice.reducer;

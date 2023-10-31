import { IProduct } from '@/types/globalTypes';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CounterState {
  products: IProduct[];
  TotalPrice: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  products: [],
  TotalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const findProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (findProduct) {
        findProduct.quantity! += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.TotalPrice += action.payload.pricing!;
    },
    removeOneFromCart: (state, action: PayloadAction<IProduct>) => {
      const quantityFilter = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (quantityFilter && quantityFilter.quantity! > 1) {
        quantityFilter.quantity! -= 1;
      } else {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      }
      state.TotalPrice -= action.payload.pricing!;
    },
    deleteFromCart: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      if (action.payload.quantity! > 0) {
        state.TotalPrice -= action.payload.quantity! * action.payload.pricing;
      }
    },
  },
});

export const { addToCart, deleteFromCart, removeOneFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;

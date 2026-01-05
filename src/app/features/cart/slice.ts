import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../products/type";

export type CartItem = Product & {
  quantity: number;
};

type CartState = {
  cartsByUserId: Record<number, CartItem[]>;
  activeUserId: number | null | undefined;
};

const initialState: CartState = {
  cartsByUserId: {},
  activeUserId: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    setActiveUser(state, action: PayloadAction<number | null>) {
      const userId = action.payload;
      state.activeUserId = userId;
      if (!state.cartsByUserId) {
        state.cartsByUserId = {};
      }

      if (userId != null && !state.cartsByUserId[userId]) {
        state.cartsByUserId[userId] = [];
      }
    },

    addToCart(state, action: PayloadAction<Product>) {
      const userId = state.activeUserId;
      if (!userId) return;

      if (!state.cartsByUserId[userId]) {
        state.cartsByUserId[userId] = [];
      }

      const cart = state.cartsByUserId[userId];

      const exists = cart.find((item) => item.id === action.payload.id);
      if (exists) return;

      cart.push({
        ...action.payload,
        quantity: 1,
      });
    },

    incrementQuantity(state, action: PayloadAction<number>) {
      const userId = state.activeUserId;
      if (!userId) return;

      const cart = state.cartsByUserId[userId];
      if (!cart) return;

      const item = cart.find((i) => i.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity(state, action: PayloadAction<number>) {
      const userId = state.activeUserId;
      if (!userId) return;

      const cart = state.cartsByUserId[userId];
      if (!cart) return;

      const item = cart.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    deleteProduct(state, action: PayloadAction<number>) {
      const userId = state.activeUserId;
      if (!userId) return;

      const cart = state.cartsByUserId[userId];
      if (!cart) return;

      state.cartsByUserId[userId] = cart.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, setActiveUser, deleteProduct, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  likedByUserId: Record<number, number[]>; 
}

const initialState: WishlistState = {
  likedByUserId: {},
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleLike: (
      state,
      action: PayloadAction<{ userId: number; productId: number }>
    ) => {
      const { userId, productId } = action.payload;

      if (!state.likedByUserId[userId]) {
        state.likedByUserId[userId] = [];
      }

      const userLikes = state.likedByUserId[userId];
      const index = userLikes.indexOf(productId);

      if (index > -1) {
        
        userLikes.splice(index, 1);
      } else {
        
        userLikes.push(productId);
      }
    },

    clearWishlist: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.likedByUserId[userId] = [];
    },
  },
});

export const { toggleLike, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
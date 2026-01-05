import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, AuthTokens, UserProfile } from "./types";

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<{ tokens: AuthTokens }>) => {
      state.accessToken = action.payload.tokens.access_token;
      state.refreshToken = action.payload.tokens.refresh_token;
      state.isAuthenticated = true;
    },

    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },

    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },

    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setUser, updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;

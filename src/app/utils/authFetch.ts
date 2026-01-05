import { store } from "@/app/store";
import { refreshToken } from "@/app/features/auth/service";
import { updateTokens, logout } from "@/app/features/auth/authSlice";

export const authFetch = async (input: RequestInfo, init?: RequestInit) => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;
  const refreshTokenValue = state.auth.refreshToken;

  let res = await fetch(input, { ...init, headers: { ...init?.headers, Authorization: `Bearer ${accessToken}`}});

  if (res.status === 401 && refreshTokenValue) {
    try {
      const newTokens = await refreshToken(refreshTokenValue);
      store.dispatch(updateTokens(newTokens));

      res = await fetch(input, {...init,headers: {...init?.headers,Authorization: `Bearer ${newTokens.access_token}`,},});


    } catch {
      store.dispatch(logout());
      throw new Error("Session expired");
    }
  }

  return res;
};

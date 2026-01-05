import { authApi } from "./api";
import { AuthTokens, CreateUserPayload, LoginUserPayload } from "./types";


export const createUser = async (payload: CreateUserPayload) => {
  const res = await fetch(authApi.createUser, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Signup failed");

  return res.json(); 
};


export const loginUser = async (
  payload: LoginUserPayload,
): Promise<AuthTokens> => {
  const res = await fetch(authApi.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Login failed");

  return res.json(); 
};


export const getProfile = async (token: string) => {
  const res = await fetch(authApi.profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Profile fetch failed");

  return res.json();
};

const BASE_URL = "https://api.escuelajs.co/api/v1";

export const authApi = {
  createUser: `${BASE_URL}/users`,
  login: `${BASE_URL}/auth/login`,
  refresh: `${BASE_URL}/auth/refresh-token`,
  profile: `${BASE_URL}/auth/profile`,
};

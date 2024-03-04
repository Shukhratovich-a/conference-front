import { getCookie, setCookie, deleteCookie } from "cookies-next";

export const setAuthToken = (token: string | null) => {
  if (token) setCookie("token", token, { secure: true });
  else deleteCookie("token");
};

export const getAuthToken = () => {
  return getCookie("token");
};

export const logout = () => {
  setAuthToken(null);
};

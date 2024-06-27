import { AxiosError } from "axios";
import axios from "./axios";

import { setAuthToken } from "@/helpers/auth.helper";

import { ILoginForm } from "@/components/LoginForm/LoginForm.interface";
import { IRegisterForm } from "@/components/RegisterForm/RegisterForm.interface";

export const login = async (credentials: ILoginForm): Promise<{ status: number; token?: string; id?: number }> => {
  try {
    const { data, status } = await axios.post<{ accessToken: string; id: number }>("/user/login", { ...credentials });

    if (status === 200 && !!data.accessToken) {
      setAuthToken(data.accessToken);
      return { status, id: data.id, token: data.accessToken };
    }

    return { status };
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) return { status: 401 };
    else return { status: 400 };
  }
};

export const register = async (credentials: IRegisterForm) => {
  return axios.post<{ accessToken: string }>("/user/register", { ...credentials });
};

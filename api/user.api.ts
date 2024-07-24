import querystring from "query-string";

import axios from "./axios";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";
import { IGetAll } from "@/types/request.type";

export const getAll = (options: IGetAll & { role: RoleEnum }) => {
  const url = querystring.stringifyUrl({ url: "/user/get-all", query: { ...options } });

  return axios.get<IUser[]>(url);
};

export const getById = (id: number | string, token: string) => {
  const url = querystring.stringifyUrl({ url: `/user/get-by-id/${id}` });

  return axios.get<IUser>(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const getByToken = (token: string) => {
  const url = querystring.stringifyUrl({ url: `/user/get-by-token/${token}` });

  return axios.get<IUser>(url, { headers: { Authorization: `Bearer ${token}` } });
};

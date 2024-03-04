import querystring from "query-string";

import axios from "./axios";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";

export const getAll = (role: RoleEnum) => {
  const url = querystring.stringifyUrl({ url: "/user/get-all", query: { role } });

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

import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IHeader } from "@/types/header.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/header/get", query: { ...options } });

  return axios.get<IHeader>(url);
};

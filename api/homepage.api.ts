import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IHomepage } from "@/types/homepage.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/homepage/get", query: { ...options } });

  return axios.get<IHomepage>(url);
};

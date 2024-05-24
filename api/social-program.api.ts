import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { ISocialProgram } from "@/types/social-program.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/social-program/get", query: { ...options } });

  return axios.get<ISocialProgram>(url);
};

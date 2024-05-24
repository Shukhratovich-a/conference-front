import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IProgram } from "@/types/program.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/program/get", query: { ...options } });

  return axios.get<IProgram>(url);
};

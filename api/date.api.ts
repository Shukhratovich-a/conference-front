import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IDate } from "@/types/date.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/date/get", query: { ...options } });

  return axios.get<IDate>(url);
};

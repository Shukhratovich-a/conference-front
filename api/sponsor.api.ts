import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { ISponsor } from "@/types/sponsor.type";

export const getAll = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/sponsor/get-all", query: { ...options } });

  return axios.get<ISponsor[]>(url);
};

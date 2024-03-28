import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { ISection } from "@/types/section.type";

export const getAll = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/section/get-all", query: { ...options } });

  return axios.get<ISection[]>(url);
};

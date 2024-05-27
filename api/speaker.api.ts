import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { ISpeaker } from "@/types/speaker.type";

export const getAll = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/speaker/get-all", query: { ...options } });

  return axios.get<ISpeaker[]>(url);
};

import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IFee } from "@/types/fee.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/fee/get", query: { ...options } });

  return axios.get<IFee>(url);
};

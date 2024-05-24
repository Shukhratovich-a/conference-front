import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IContact } from "@/types/contact.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/contact/get", query: { ...options } });

  return axios.get<IContact>(url);
};

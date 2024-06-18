import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IVenue } from "@/types/venue.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/venue/get", query: { ...options } });

  return axios.get<IVenue>(url);
};

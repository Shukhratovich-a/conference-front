import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IAccommodation } from "@/types/accommodation.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/accommodation/get", query: { ...options } });

  return axios.get<IAccommodation>(url);
};

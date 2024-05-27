import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { IOrganizerType } from "@/types/organizer.type";

export const getAll = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/organizer/get-all", query: { ...options } });

  return axios.get<IOrganizerType[]>(url);
};

import querystring from "query-string";

import axios from "./axios";

import { ISection } from "@/types/section.type";

export const getAll = () => {
  const url = querystring.stringifyUrl({ url: "/section/get-all" });

  return axios.get<ISection[]>(url);
};

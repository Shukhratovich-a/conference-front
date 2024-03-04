import querystring from "query-string";

import axios from "./axios";

import { ITopic } from "@/types/topic.type";

export const getAll = () => {
  const url = querystring.stringifyUrl({ url: "/topic/get-all" });

  return axios.get<ITopic[]>(url);
};

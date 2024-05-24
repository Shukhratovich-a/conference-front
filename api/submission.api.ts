import querystring from "query-string";

import axios from "./axios";

import { IGetAll } from "@/types/request.type";
import { ISubmission } from "@/types/submission.type";

export const get = (options?: IGetAll) => {
  const url = querystring.stringifyUrl({ url: "/submission/get", query: { ...options } });

  return axios.get<ISubmission>(url);
};

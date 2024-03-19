import querystring from "query-string";

import axios from "./axios";

import { IArticle } from "@/types/article.type";
import { IArticleForm } from "@/components/ArticleForm/ArticleForm.interface";

export const getByToken = (token: string) => {
  const url = querystring.stringifyUrl({ url: `/article/get-by-token/${token}` });

  return axios.get<IArticle[]>(url, { headers: { Authorization: `Bearer ${token}` } });
};

export const create = (credentials: IArticleForm, token: string) => {
  const url = querystring.stringifyUrl({ url: `/article/create` });

  return axios.post<IArticle>(url, { ...credentials }, { headers: { Authorization: `Bearer ${token}` } });
};

export const remove = (id: number, token: string) => {
  const url = querystring.stringifyUrl({ url: `/article/delete/${id}` });

  return axios.delete<{}>(url, { headers: { Authorization: `Bearer ${token}` } });
};

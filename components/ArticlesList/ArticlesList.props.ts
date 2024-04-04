import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IArticle } from "@/types/article.type";

export interface ArticlesListProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  articles: IArticle[];
}

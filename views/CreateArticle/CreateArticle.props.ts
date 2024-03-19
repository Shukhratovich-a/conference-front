import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ITopic } from "@/types/topic.type";

export interface CreateArticlesViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  topics: ITopic[];
}

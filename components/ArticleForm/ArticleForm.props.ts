import { DetailedHTMLProps, FormHTMLAttributes } from "react";

import { ITopic } from "@/types/topic.type";

export interface ArticleFormProps
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "children"> {
  topics: ITopic[];
}

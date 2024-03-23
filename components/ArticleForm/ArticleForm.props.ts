import { DetailedHTMLProps, FormHTMLAttributes } from "react";

import { ISection } from "@/types/section.type";

export interface ArticleFormProps
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "children"> {
  sections: ISection[];
}

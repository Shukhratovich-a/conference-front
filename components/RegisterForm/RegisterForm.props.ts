import { DetailedHTMLProps, FormHTMLAttributes } from "react";

import { ISection } from "@/types/section.type";

export interface RegisterFormProps
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "children"> {
  sections: ISection[];
}

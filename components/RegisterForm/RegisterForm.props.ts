import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export interface RegisterFormProps
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "children"> {}

import { DetailedHTMLProps, FormHTMLAttributes } from "react";

export interface LoginFormProps
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, "children"> {}

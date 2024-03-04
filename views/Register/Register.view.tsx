import { FC } from "react";
import cn from "classnames";

import { RegisterViewProps } from "./Register.props";

import { RegisterForm } from "@/components";

import styles from "./Register.module.scss";

export const RegisterView: FC<RegisterViewProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      <RegisterForm />
    </div>
  );
};

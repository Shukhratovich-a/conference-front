import { FC } from "react";
import cn from "classnames";

import { LoginViewProps } from "./Login.props";

import { LoginForm } from "@/components";

import styles from "./Login.module.scss";

export const LoginView: FC<LoginViewProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      <LoginForm />
    </div>
  );
};

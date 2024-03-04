import cn from "classnames";

import { ButtonProps } from "./Button.props";

import styles from "./Button.module.scss";

export const Button = ({ children, className, size = "md", ...props }: ButtonProps): JSX.Element => {
  return (
    <button className={cn(styles.button, className, { [styles["button--sm"]]: size === "sm" })} {...props}>
      {children}
    </button>
  );
};

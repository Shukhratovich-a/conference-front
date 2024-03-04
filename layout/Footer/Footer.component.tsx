import { FC } from "react";
import cn from "classnames";

import { FooterProps } from "./Footer.props";

import styles from "./Footer.module.scss";

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <div className={cn(styles.inner)}>
        <span className={cn(styles.left)}>
          The 9th International Conference on Control and Optimization with Industrial Applications
        </span>

        <span className={cn(styles.right)}>Nuu</span>
      </div>
    </footer>
  );
};

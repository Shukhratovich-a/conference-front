import React from "react";
import cn from "classnames";

import { SelectProps } from "./Select.props";

import styles from "./Select.module.scss";

export const Select = React.forwardRef(
  ({ className, children, error, ...props }: SelectProps, ref: React.ForwardedRef<HTMLSelectElement>): JSX.Element => {
    return (
      <div className={cn(styles.wrapper, className)}>
        <select className={cn(styles.select, { [styles.error]: error })} ref={ref} {...props}>
          {children}
        </select>

        {error && <span className={styles.error__message}>{error.message}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";

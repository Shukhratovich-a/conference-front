import React from "react";
import cn from "classnames";

import { InputProps } from "./Input.props";

import styles from "./Input.module.scss";

export const Input = React.forwardRef(
  ({ className, error, ...props }: InputProps, ref: React.ForwardedRef<HTMLInputElement>): JSX.Element => {
    return (
      <div className={cn(styles.wrapper, className)}>
        <input className={cn(styles.input, { [styles.error]: error })} ref={ref} {...props} />

        {error && <span className={styles.error__message}>{error.message}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

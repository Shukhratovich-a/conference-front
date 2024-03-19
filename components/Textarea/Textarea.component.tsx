import React from "react";
import cn from "classnames";

import { TextareaProps } from "./Textarea.props";

import styles from "./Textarea.module.scss";

export const Textarea = React.forwardRef(
  ({ className, error, ...props }: TextareaProps, ref: React.ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
      <div className={cn(styles.wrapper, className)}>
        <textarea className={cn(styles.input, { [styles.error]: error })} ref={ref} {...props} />

        {error && <span className={styles.error__message}>{error.message}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

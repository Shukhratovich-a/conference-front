import { FC } from "react";
import cn from "classnames";

import { ConferenceFeesViewProps } from "./ConferenceFees.props";

import styles from "./ConferenceFees.module.scss";

export const ConferenceFeesView: FC<ConferenceFeesViewProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      ConferenceFees
    </div>
  );
};

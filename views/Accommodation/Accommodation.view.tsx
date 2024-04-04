import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { AccommodationViewProps } from "./Accommodation.props";

import styles from "./Accommodation.module.scss";

export const AccommodationView: FC<AccommodationViewProps> = ({ className, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      Accommodation
    </div>
  );
};

import { FC } from "react";
import cn from "classnames";

import { HomeViewProps } from "./Home.props";

import { MainText } from "@/components";

import styles from "./Home.module.scss";

export const HomeView: FC<HomeViewProps> = ({ className, homepage, sections, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>Home</h2>

      <MainText mainText={homepage.mainText || ""} sections={sections} />
    </div>
  );
};

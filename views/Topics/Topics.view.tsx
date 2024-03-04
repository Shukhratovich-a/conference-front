import { FC } from "react";
import cn from "classnames";

import { TopicsViewProps } from "./Topics.props";

import styles from "./Topics.module.scss";

export const TopicsView: FC<TopicsViewProps> = ({ className, topics, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>Topics</h2>

      {topics.length ? (
        <ul className={cn(styles.list)}>
          {topics.map(({ id, title }, index) => (
            <li className={cn(styles.item)} key={id}>{`${index + 1}. ${title}`}</li>
          ))}
        </ul>
      ) : (
        <div>No topics yet</div>
      )}
    </div>
  );
};

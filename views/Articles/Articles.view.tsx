import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { ArticlesViewProps } from "./Articles.props";

import { ArticlesList } from "@/components";

import styles from "./Articles.module.scss";

export const ArticlesView: FC<ArticlesViewProps> = ({ className, articles, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      <div className={cn(styles.nav)}>
        <Link className={cn(styles.link)} href="/profile">
          <span>Info</span>
        </Link>

        <Link className={cn(styles.link, styles["link--active"])} href="/profile/articles">
          <span>Articles</span>
        </Link>

        <Link className={cn(styles.link)} href="/profile/articles/create">
          <span>Create article</span>
        </Link>
      </div>

      <ArticlesList articles={articles} />
    </div>
  );
};

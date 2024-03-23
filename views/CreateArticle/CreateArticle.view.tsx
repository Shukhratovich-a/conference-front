import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { CreateArticlesViewProps } from "./CreateArticle.props";

import styles from "./CreateArticle.module.scss";
import { ArticleForm } from "@/components";

export const CreateArticlesView: FC<CreateArticlesViewProps> = ({ className, sections, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      <div className={cn(styles.nav)}>
        <Link className={cn(styles.link)} href="/profile">
          <span>Info</span>
        </Link>

        <Link className={cn(styles.link)} href="/profile/articles">
          <span>Articles</span>
        </Link>

        <Link className={cn(styles.link, styles["link--active"])} href="/profile/articles/create">
          <span>Create article</span>
        </Link>
      </div>

      <ArticleForm sections={sections} />
    </div>
  );
};

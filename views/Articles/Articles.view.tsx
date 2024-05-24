import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ArticlesViewProps } from "./Articles.props";

import { ArticlesList } from "@/components";

import styles from "./Articles.module.scss";

export const ArticlesView: FC<ArticlesViewProps> = ({ className, articles, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.view, className)} {...props}>
      <div className={cn(styles.nav)}>
        <Link className={cn(styles.link)} href="/profile">
          <span>{t("profile.info")}</span>
        </Link>

        <Link className={cn(styles.link, styles["link--active"])} href="/profile/articles">
          <span>{t("profile.articles")}</span>
        </Link>

        <Link className={cn(styles.link)} href="/profile/articles/create">
          <span>{t("profile.create-article")}</span>
        </Link>
      </div>

      <ArticlesList articles={articles} />
    </div>
  );
};

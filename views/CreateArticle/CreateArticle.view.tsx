import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { CreateArticlesViewProps } from "./CreateArticle.props";

import { ArticleForm } from "@/components";

import styles from "./CreateArticle.module.scss";

export const CreateArticlesView: FC<CreateArticlesViewProps> = ({ className, sections, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.view, className)} {...props}>
      <div className={cn(styles.nav)}>
        <Link className={cn(styles.link)} href="/profile">
          <span>{t("profile.info")}</span>
        </Link>

        <Link className={cn(styles.link)} href="/profile/articles">
          <span>{t("profile.articles")}</span>
        </Link>

        <Link className={cn(styles.link, styles["link--active"])} href="/profile/articles/create">
          <span>{t("profile.create-article")}</span>
        </Link>
      </div>

      <ArticleForm sections={sections} />
    </div>
  );
};

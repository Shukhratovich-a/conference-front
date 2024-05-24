import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ProfileViewProps } from "./Profile.props";

import { UserInfo } from "@/components";

import styles from "./Profile.module.scss";

export const ProfileView: FC<ProfileViewProps> = ({ className, user, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.view, className)} {...props}>
      <div className={cn(styles.nav)}>
        <Link className={cn(styles.link, styles["link--active"])} href="/profile">
          <span>{t("profile.info")}</span>
        </Link>

        <Link className={cn(styles.link)} href="/profile/articles">
          <span>{t("profile.articles")}</span>
        </Link>

        <Link className={cn(styles.link)} href="/profile/articles/create">
          <span>{t("profile.create-article")}</span>
        </Link>
      </div>

      <UserInfo className={cn(styles.info)} user={user} />
    </div>
  );
};

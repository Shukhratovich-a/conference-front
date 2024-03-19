import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { ProfileViewProps } from "./Profile.props";

import { UserInfo } from "@/components";

import styles from "./Profile.module.scss";

export const ProfileView: FC<ProfileViewProps> = ({ className, user, ...props }) => {
  return (
    <div className={cn(styles.view, className)} {...props}>
      <div className={cn(styles.nav)}>
        <Link className={cn(styles.link, styles["link--active"])} href="/profile">
          <span>Info</span>
        </Link>

        <Link className={cn(styles.link)} href="/profile/articles">
          <span>Articles</span>
        </Link>

        <Link className={cn(styles.link)} href="/profile/articles/create">
          <span>Create article</span>
        </Link>
      </div>

      <UserInfo className={cn(styles.info)} user={user} />
    </div>
  );
};

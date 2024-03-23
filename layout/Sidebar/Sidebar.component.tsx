import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { SidebarProps } from "./Sidebar.props";

import styles from "./Sidebar.module.scss";

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  const { t } = useTranslation();

  return (
    <nav className={cn(styles.nav, className)} {...props}>
      <ul className={cn(styles.list)}>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/sections"}>
            {t("sections")}
          </Link>
        </li>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/contacts"}>
            {t("contacts")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

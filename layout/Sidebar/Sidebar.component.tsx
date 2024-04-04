import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { SidebarProps } from "./Sidebar.props";

import { sidebarMenu } from "@/helpers/sidebar.helper";

import styles from "./Sidebar.module.scss";

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  const { t } = useTranslation();

  const translate = (key: string, defaultText: string) => {
    return t(key) === key || !!t(key) ? t(key) : defaultText;
  };

  return (
    <nav className={cn(styles.nav, className)} {...props}>
      <ul className={cn(styles.list)}>
        {sidebarMenu.map((item) => (
          <li className={cn(styles.item)} key={item.id}>
            <Link className={cn(styles.link)} href={item.route}>
              {translate(item.translate, item.title)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

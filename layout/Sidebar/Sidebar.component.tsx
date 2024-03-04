import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { SidebarProps } from "./Sidebar.props";

import styles from "./Sidebar.module.scss";

export const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  return (
    <nav className={cn(styles.nav, className)} {...props}>
      <ul className={cn(styles.list)}>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/topics"}>
            Topics
          </Link>
        </li>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/contacts"}>
            Contacts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

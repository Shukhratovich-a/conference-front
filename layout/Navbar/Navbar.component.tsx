import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { NavbarProps } from "./Navbar.props";

import styles from "./Navbar.module.scss";

export const Navbar: FC<NavbarProps> = ({ className, ...props }) => {
  const { t } = useTranslation();

  return (
    <nav className={cn(styles.nav, className)} {...props}>
      <ul className={cn(styles.list)}>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/"}>
            {t("home")}
          </Link>
        </li>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/organizers"}>
            {t("organizers")}
          </Link>
        </li>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/speakers"}>
            {t("speakers")}
          </Link>
        </li>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/participants"}>
            {t("participants")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

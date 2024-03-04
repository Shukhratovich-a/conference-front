import { FC } from "react";
import Link from "next/link";
import cn from "classnames";

import { NavbarProps } from "./Navbar.props";

import styles from "./Navbar.module.scss";

export const Navbar: FC<NavbarProps> = ({ className, ...props }) => {
  return (
    <nav className={cn(styles.nav, className)} {...props}>
      <ul className={cn(styles.list)}>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/"}>
            Home
          </Link>
        </li>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/organizers"}>
            Organizers
          </Link>
        </li>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/speakers"}>
            Speakers
          </Link>
        </li>
        <li className={cn(styles.item)}>
          <Link className={cn(styles.link)} href={"/participants"}>
            Participants
          </Link>
        </li>
      </ul>
    </nav>
  );
};

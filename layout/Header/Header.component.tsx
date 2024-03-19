import { FC, useContext } from "react";
import Link from "next/link";
import cn from "classnames";

import { HeaderProps } from "./Header.props";

import { AuthContext } from "@/contexts/auth.context";

import { Button } from "@/components";
import { Navbar } from "../Navbar/Navbar.component";

import styles from "./Header.module.scss";

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const { token, user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    if (!logout) return;

    logout();
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={cn(styles.top)}>
        <div className={cn(styles.inner)}>
          <div className={cn(styles.logo)}>Logo</div>

          <div className={cn(styles.content)}>Some info</div>

          <div className={cn(styles.user)}>
            {user && token ? (
              <div>
                <Link href={`/profile`}>
                  <Button className={cn(styles.button)} size="sm" tabIndex={-1}>
                    {`${user.firstName} ${user.lastName}`}
                  </Button>
                </Link>
                <Button className={cn(styles.button)} size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button className={cn(styles.button)} size="sm">
                  <Link href={`/auth/login`}>Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={cn(styles.bottom)}>
        <Navbar className={cn(styles.nav)} />
      </div>
    </header>
  );
};

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import { IUser } from "@/types/user.type";
import { HeaderProps } from "./Header.props";

import { getAuthToken, logout } from "@/helpers/auth.helper";

import { Button } from "@/components";
import { Navbar } from "../Navbar/Navbar.component";

import styles from "./Header.module.scss";
import { getByToken } from "@/api/user.api";
import Link from "next/link";

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const { pathname, replace } = useRouter();

  const token = getAuthToken();

  const [userState, setUserState] = useState<IUser | null>(null);
  const [tokenState, setTokenState] = useState<string | null>(token as string);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!token) {
      setUserState(null);
      setTokenState(null);
      return;
    }

    setTokenState(token);

    (async () => {
      const { data } = await getByToken(token);

      setUserState(data);
    })();
  }, [token]);

  const handleLogout = () => {
    setUserState(null);
    setTokenState(null);

    if (pathname.startsWith("/profile")) replace("/auth/login");
    logout();
  };

  if (!isMounted) {
    return (
      <header className={cn(styles.header, className)} {...props}>
        <div className={cn(styles.top)}>
          <div className={cn(styles.inner)}>
            <div></div>

            <div></div>
          </div>
        </div>

        <div className={cn(styles.bottom)}>
          <Navbar className={cn(styles.nav)} />
        </div>
      </header>
    );
  }

  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={cn(styles.top)}>
        <div className={cn(styles.inner)}>
          <div></div>

          <div>
            {userState && tokenState ? (
              <div>
                <Button className={cn(styles.button)} size="sm">
                  <Link href={`/profile/${userState.id}`}>{`${userState.firstName} ${userState.lastName}`}</Link>
                </Button>
                <Button className={cn(styles.button)} size="sm" onClick={handleLogout}>
                  Log out
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

export default Header;

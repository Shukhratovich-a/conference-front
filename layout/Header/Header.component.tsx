import { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import cn from "classnames";

import { HeaderProps } from "./Header.props";

import { AuthContext } from "@/contexts/auth.context";

import { Button } from "@/components";
import { Navbar } from "@/layout/Navbar/Navbar.component";

import HeaderBackground from "@/assets/images/header-background.webp";
import HeaderLogo from "@/assets/images/logo.webp";

import styles from "./Header.module.scss";

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const { token, user, logout } = useContext(AuthContext);
  const { pathname } = useRouter();

  const handleLogout = () => {
    if (!logout) return;

    logout();
  };

  return (
    <header className={cn(styles.header, className)} {...props}>
      <div className={cn(styles.top)}>
        <div className={cn(styles.inner)}>
          <div className={cn(styles.logo)}>
            <Image className={cn(styles.logo__image)} src={HeaderLogo} alt="" priority height={100} />
          </div>

          <div className={cn(styles.content)}>
            {`IX xalqaro ilmiy "Amaliy matematika va axborot texnologiyalarining dolzarb muammolari" - Al-Xorazmiy 2024 xalqaro ilmiy konferensiyasi`}
          </div>

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
        {pathname === "/" && (
          <div className={cn(styles.background)}>
            <Image className={cn(styles.background__image)} src={HeaderBackground} alt="" fill priority />
          </div>
        )}

        <Navbar className={cn(styles.nav)} />
      </div>
    </header>
  );
};

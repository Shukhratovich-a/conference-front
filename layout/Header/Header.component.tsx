import { FC, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { HeaderProps } from "./Header.props";

import { AuthContext } from "@/contexts/auth.context";

import { Button, Language } from "@/components";
import { Navbar } from "@/layout/Navbar/Navbar.component";

import HeaderBackground from "@/assets/images/header-background.webp";
import HeaderLogo from "@/assets/images/logo.webp";

import styles from "./Header.module.scss";

export const Header: FC<HeaderProps> = ({ className, ...props }) => {
  const { token, user, logout } = useContext(AuthContext);
  const { pathname } = useRouter();
  const { t } = useTranslation();

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

          <div className={cn(styles.content)}>{t("main-text")}</div>

          <div className={cn(styles.user)}>
            {user && token ? (
              <div>
                <Link href={`/profile`}>
                  <Button className={cn(styles.button)} size="sm" tabIndex={-1}>
                    {`${user.firstName} ${user.lastName}`}
                  </Button>
                </Link>
                <Button className={cn(styles.button)} size="sm" onClick={handleLogout}>
                  {t("logout")}
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

          <Language className={cn(styles.language)} />
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

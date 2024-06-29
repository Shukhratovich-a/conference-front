import { FC } from "react";
import cn from "classnames";
import { useTranslation } from "next-i18next";

import { FooterProps } from "./Footer.props";

import styles from "./Footer.module.scss";

export const Footer: FC<FooterProps> = ({ className, ...props }) => {
  const { t } = useTranslation();

  return (
    <footer className={cn(styles.footer, className)} {...props}>
      <div className={cn(styles.inner)}>
        <span className={cn(styles.left)}>{t("footer")}</span>

        {/* <span className={cn(styles.right)}>Nuu</span> */}
      </div>
    </footer>
  );
};

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { LanguageProps } from "./Language.props";

import { languages } from "@/helpers/language.helper";

import { useOutsideClick } from "@/hooks/useOutsideClick";

import { IconArrowBottom } from "@/icons";

import styles from "./Language.module.scss";

export const Language: FC<LanguageProps> = ({ className, isScrolled, ...props }) => {
  const { i18n } = useTranslation();
  let { replace, query, pathname } = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const locales = languages.filter((language) => language.locale !== i18n.language);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
  };

  const handleClose = () => {
    if (!isOpen) return;
    setIsOpen(false);
  };

  const handleChange = async (locale: string) => {
    setIsOpen(false);

    replace({ pathname, query }, "", { scroll: false, locale });
  };

  const ref = useOutsideClick<HTMLDivElement>(handleClose);

  return (
    <div
      className={cn(styles["language"], "button", className, { [styles["language--scrolled"]]: isScrolled })}
      ref={ref}
      {...props}
    >
      <span className={cn(styles["language--selected"])} onClick={!isOpen ? handleOpen : handleClose}>
        <span>{i18n.language}</span>
        <IconArrowBottom />
      </span>

      <ul
        className={cn(styles["language__list"], {
          [styles["language__list--open"]]: isOpen,
        })}
      >
        {locales.map(({ locale }) => (
          <li className={cn(styles.language__list__item)} key={locale} onClick={() => handleChange(locale)}>
            {locale}
          </li>
        ))}
      </ul>
    </div>
  );
};

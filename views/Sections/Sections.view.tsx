import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { SectionsViewProps } from "./Sections.props";

import styles from "./Sections.module.scss";

export const SectionsView: FC<SectionsViewProps> = ({ className, sections, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>{t("sections")}</h2>

      {sections.length ? (
        <ul className={cn(styles.list)}>
          {sections.map(({ id, title }, index) => (
            <li className={cn(styles.item)} key={id}>{`${index + 1}. ${title}`}</li>
          ))}
        </ul>
      ) : (
        <div>No sections yet</div>
      )}
    </div>
  );
};

import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { OrganizersViewProps } from "./Organizers.props";

import styles from "./Organizers.module.scss";

export const OrganizersView: FC<OrganizersViewProps> = ({ className, organizers, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>{t("organizers")}</h2>

      {organizers.length ? (
        <ul className={cn(styles.list)}>
          {organizers.map(({ id, firstName, lastName, country }, index) => (
            <li className={cn(styles.item)} key={id}>{`${index + 1}. ${firstName} ${lastName} (${country})`}</li>
          ))}
        </ul>
      ) : (
        <div>No organizers yet</div>
      )}
    </div>
  );
};

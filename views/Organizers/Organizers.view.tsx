import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { OrganizersViewProps } from "./Organizers.props";

import styles from "./Organizers.module.scss";
import { IOrganizer } from "@/types/organizer.type";

export const OrganizersView: FC<OrganizersViewProps> = ({ className, organizerTypes, ...props }) => {
  const { t } = useTranslation();

  const parser = ({ name, specialty, country, city, role }: Omit<IOrganizer, "id">) =>
    `${name} - ${specialty}, ${country}` + (city ? `, ${city}` : "") + (role ? `, ${role}` : "");

  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>{t("organizers")}</h2>

      {!!organizerTypes.length ? (
        <ul className={cn(styles.list)}>
          {organizerTypes.map(({ title, organizers }, index) => (
            <li className={cn(styles.item)} key={index}>
              <h3 className={cn(styles.item__heading)}>{title}</h3>

              {!!organizers.length && (
                <ul className={cn(styles.list__inner)}>
                  {organizers.map(({ id, ...organizer }) => (
                    <li className={cn(styles.item__inner)} key={id}>
                      {parser(organizer)}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>No organizers yet</div>
      )}
    </div>
  );
};

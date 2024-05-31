import { FC } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import cn from "classnames";

import { SponsorsViewProps } from "./Sponsors.props";

import styles from "./Sponsors.module.scss";

export const SponsorsView: FC<SponsorsViewProps> = ({ className, sponsors, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>{t("sidebar.sponsors")}</h2>

      {sponsors.length ? (
        <ul className={cn(styles.list)}>
          {sponsors.map(({ id, image, title }) => (
            <li className={cn(styles.item)} key={id}>
              <Image className={cn(styles.image)} src={image} width={250} height={150} alt={title} />
              <span>{title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>No Sponsors yet</div>
      )}
    </div>
  );
};

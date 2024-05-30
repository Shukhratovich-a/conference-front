import { FC } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import cn from "classnames";

import { SpeakersViewProps } from "./Speakers.props";

import styles from "./Speakers.module.scss";

export const SpeakersView: FC<SpeakersViewProps> = ({ className, speakers, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>{t("speakers")}</h2>

      {speakers.length ? (
        <>
          <ul className={cn(styles.list)}>
            {speakers.map(({ id, name, degree, image, specialty, description }) => (
              <li className={cn(styles.item)} key={id}>
                <Image className={cn(styles.image)} src={image} width={200} height={200} alt={`${degree} ${name}`} />

                <div>
                  <p>
                    <strong>{name}</strong> - <span>{specialty}</span>
                  </p>

                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div>No Speakers yet</div>
      )}
    </div>
  );
};

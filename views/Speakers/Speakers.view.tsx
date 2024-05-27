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
            {speakers.map(({ id, name, degree, image }) => (
              <li className={cn(styles.item)} key={id}>
                <Image src={image} width={200} height={200} alt={`${degree} ${name}`} />

                <span>{`${degree} ${name} `}</span>
              </li>
            ))}
          </ul>

          <ul className={cn(styles.list)}>
            {speakers.map(({ id, name, specialty, description }) => (
              <li className={cn(styles.item)} key={id}>
                <p>
                  <strong>{name}</strong> - <span>{specialty}</span>
                </p>

                <p>{description}</p>
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

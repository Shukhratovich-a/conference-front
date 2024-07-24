import { FC } from "react";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ParticipantsViewProps } from "./Participants.props";

import styles from "./Participants.module.scss";
import { useRouter } from "next/router";

export const ParticipantsView: FC<ParticipantsViewProps> = ({ className, participants, ...props }) => {
  const { t } = useTranslation();
  const {
    query: { page },
  } = useRouter();

  const indexCounter = (page: string, index: number) => {
    if (Number(page)) return (Number(page) - 1) * 25 + index + 1;

    return index + 1;
  };

  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>{t("participants")}</h2>

      {participants.length ? (
        <ul className={cn(styles.list)}>
          {participants.map(({ id, firstName, lastName, country }, index) => (
            <li className={cn(styles.item)} key={id}>{`${indexCounter(
              page as string,
              index
            )}. ${firstName} ${lastName} (${country})`}</li>
          ))}
        </ul>
      ) : (
        <div>No participants yet</div>
      )}
    </div>
  );
};

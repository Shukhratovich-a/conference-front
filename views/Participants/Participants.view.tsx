import { FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { ParticipantsViewProps } from "./Participants.props";

import { Pagination } from "@/components";

import styles from "./Participants.module.scss";

export const ParticipantsView: FC<ParticipantsViewProps> = ({ className, users, ...props }) => {
  const { t } = useTranslation();
  const {
    query: { page, ...query },
    replace,
    pathname,
  } = useRouter();

  const { data: participants, total } = users;

  const indexCounter = (page: string, index: number) => {
    if (Number(page)) return (Number(page) - 1) * 25 + index + 1;

    return index + 1;
  };

  const handlePrev = () => {
    replace({ pathname, query: { ...query, page: Number(page) - 1 } });
  };

  const handleNext = () => {
    replace({ pathname, query: { ...query, page: Number(page) + 1 } });
  };

  return (
    <div className={cn(styles.view, className)} {...props}>
      <h2 className={cn(styles.heading)}>{t("participants")}</h2>

      {participants.length ? (
        <div>
          <ul className={cn(styles.list)}>
            {participants.map(({ id, firstName, lastName, country }, index) => (
              <li className={cn(styles.item)} key={id}>{`${indexCounter(
                page as string,
                index
              )}. ${firstName} ${lastName} (${country})`}</li>
            ))}
          </ul>

          <Pagination total={total} perPage={25} currentPage={Number(page)} onNext={handleNext} onPrev={handlePrev} />
        </div>
      ) : (
        <div>No participants yet</div>
      )}
    </div>
  );
};

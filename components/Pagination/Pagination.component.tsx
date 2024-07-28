import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

import { PaginationProps } from "./Pagination.props";

import { IconArrowLeft, IconArrowRight } from "@/assets/icons";

import styles from "./Pagination.module.scss";

export const Pagination: FC<PaginationProps> = ({
  className,
  total,
  perPage,
  currentPage,
  onNext,
  onPrev,
  ...props
}) => {
  const [paginationState] = useState(new Array(Math.ceil(total / perPage)).fill(<></>));
  const [currentPageState, setCurrentPageState] = useState<number>(currentPage);

  const {
    query: { page, ...query },
    pathname,
    replace,
  } = useRouter();

  useEffect(() => {
    if (!!Number(page)) setCurrentPageState(Number(page));
  }, [page]);

  const handleNavigate = (page: number) => {
    replace({ pathname, query: { page, ...query } });
  };

  return (
    <div className={cn(styles.pagination)} {...props}>
      <button
        className={cn(styles.pagination__button, styles["pagination__button--prev"])}
        onClick={onPrev}
        disabled={currentPageState <= 1}
      >
        <IconArrowLeft />
      </button>

      <ul className={cn(styles.pagination__list)}>
        {paginationState.map((_, index) => (
          <li
            className={cn(styles.pagination__item, {
              [styles["pagination__item--active"]]: index + 1 === currentPageState,
            })}
            key={index}
            onClick={() => handleNavigate(index + 1)}
          >
            <span>{index + 1}</span>
          </li>
        ))}
      </ul>

      <button
        className={cn(styles.pagination__button, styles["pagination__button--next"])}
        onClick={onNext}
        disabled={currentPageState >= Math.ceil(total / perPage)}
      >
        <IconArrowRight />
      </button>
    </div>
  );
};

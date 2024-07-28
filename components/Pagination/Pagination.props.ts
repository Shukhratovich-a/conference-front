import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface PaginationProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  total: number;
  perPage: number;
  currentPage: number;

  onNext: () => void;
  onPrev: () => void;
}

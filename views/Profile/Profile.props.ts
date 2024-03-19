import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import { IUser } from "@/types/user.type";

export interface ProfileViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  user: IUser;
}

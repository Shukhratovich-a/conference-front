import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

import { IUser } from "@/types/user.type";

export interface UserInfoProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  user: IUser;
}

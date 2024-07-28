import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IUser } from "@/types/user.type";

export interface ParticipantsViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  users: { data: IUser[]; total: number };
}

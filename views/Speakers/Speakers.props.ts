import { DetailedHTMLProps, HTMLAttributes } from "react";

import { IUser } from "@/types/user.type";

export interface SpeakersViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  speakers: IUser[];
}

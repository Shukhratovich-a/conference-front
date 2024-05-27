import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ISpeaker } from "@/types/speaker.type";

export interface SpeakersViewProps
  extends Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> {
  speakers: ISpeaker[];
}

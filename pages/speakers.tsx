import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { ISpeaker } from "@/types/speaker.type";

import { get as getHeader } from "@/api/header.api";
import { getByToken } from "@/api/user.api";
import { getAll as getAllSpeakers } from "@/api/speaker.api";

import { SpeakersView } from "@/views";

import { withLayout } from "@/layout/Layout";

const SpeakersPage: FC<SpeakersPageProps> = ({ speakers }) => {
  return <SpeakersView speakers={speakers} />;
};

export const getServerSideProps: GetServerSideProps<SpeakersPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });
  const { data: speakers } = await getAllSpeakers({ language: locale });

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      header,
      token,
      user,
      speakers,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(SpeakersPage);

interface SpeakersPageProps extends Record<string, unknown> {
  header: IHeader;
  speakers: ISpeaker[];
  token: string | null;
  user: IUser | null;
}

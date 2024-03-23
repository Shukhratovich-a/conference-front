import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";

import { getAll, getByToken } from "@/api/user.api";

import { SpeakersView } from "@/views";

import { withLayout } from "@/layout/Layout";

const SpeakersPage: FC<SpeakersPageProps> = ({ speakers }) => {
  return <SpeakersView speakers={speakers} />;
};

export const getServerSideProps: GetServerSideProps<SpeakersPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: speakers } = await getAll(RoleEnum.SPEAKER);

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      speakers,
      token,
      user,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(SpeakersPage);

interface SpeakersPageProps extends Record<string, unknown> {
  speakers: IUser[];
  token: string | null;
  user: IUser | null;
}

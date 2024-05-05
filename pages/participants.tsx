import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";

import { get as getHeader } from "@/api/header.api";
import { getAll, getByToken } from "@/api/user.api";

import { ParticipantsView } from "@/views";

import { withLayout } from "@/layout/Layout";

const ParticipantsPage: FC<ParticipantsPageProps> = ({ participants }) => {
  return <ParticipantsView participants={participants} />;
};

export const getServerSideProps: GetServerSideProps<ParticipantsPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });
  const { data: participants } = await getAll(RoleEnum.PARTICIPANT);

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      header,
      participants,
      token,
      user,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(ParticipantsPage);

interface ParticipantsPageProps extends Record<string, unknown> {
  header: IHeader;
  participants: IUser[];
  token: string | null;
  user: IUser | null;
}

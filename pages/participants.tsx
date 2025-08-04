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
  return <ParticipantsView users={participants} />;
};

export const getServerSideProps: GetServerSideProps<ParticipantsPageProps> = async ({
  req: { cookies },
  query,
  locale,
}) => {
  const { page } = query;

  const { data: header } = await getHeader({ language: locale === 'ar' ? 'ru' : locale });
  const { data: participants } = await getAll({ role: RoleEnum.PARTICIPANT, limit: 25, page: Number(page) || 1 });

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
  participants: { data: IUser[]; total: number };
  token: string | null;
  user: IUser | null;
}

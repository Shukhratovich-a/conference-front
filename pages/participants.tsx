import { FC } from "react";
import { GetServerSideProps } from "next";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";

import { getAll, getByToken } from "@/api/user.api";

import { ParticipantsView } from "@/views";

import { withLayout } from "@/layout/Layout";

const ParticipantsPage: FC<ParticipantsPageProps> = ({ participants }) => {
  return <ParticipantsView participants={participants} />;
};

export const getServerSideProps: GetServerSideProps<ParticipantsPageProps> = async ({ req: { cookies } }) => {
  const { data: participants } = await getAll(RoleEnum.PARTICIPANT);

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      participants,
      token,
      user,
    },
  };
};

export default withLayout(ParticipantsPage);

interface ParticipantsPageProps extends Record<string, unknown> {
  participants: IUser[];
  token: string | null;
  user: IUser | null;
}

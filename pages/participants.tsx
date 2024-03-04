import { FC } from "react";
import { GetStaticProps } from "next";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";

import { getAll } from "@/api/user.api";

import { ParticipantsView } from "@/views";

import { withLayout } from "@/layout/Layout";

const ParticipantsPage: FC<ParticipantsPageProps> = ({ participants }) => {
  return <ParticipantsView participants={participants} />;
};

export const getStaticProps: GetStaticProps<ParticipantsPageProps> = async () => {
  const { data: participants } = await getAll(RoleEnum.PARTICIPANT);

  return {
    props: {
      participants,
    },
    revalidate: 10,
  };
};

export default withLayout(ParticipantsPage);

interface ParticipantsPageProps extends Record<string, unknown> {
  participants: IUser[];
}

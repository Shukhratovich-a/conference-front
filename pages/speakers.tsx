import { FC } from "react";
import { GetStaticProps } from "next";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";

import { getAll } from "@/api/user.api";

import { SpeakersView } from "@/views";

import { withLayout } from "@/layout/Layout";

const SpeakersPage: FC<SpeakersPageProps> = ({ speakers }) => {
  return <SpeakersView speakers={speakers} />;
};

export const getStaticProps: GetStaticProps<SpeakersPageProps> = async () => {
  const { data: speakers } = await getAll(RoleEnum.SPEAKER);

  return {
    props: {
      speakers,
    },
    revalidate: 10,
  };
};

export default withLayout(SpeakersPage);

interface SpeakersPageProps extends Record<string, unknown> {
  speakers: IUser[];
}

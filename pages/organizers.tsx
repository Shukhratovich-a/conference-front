import { FC } from "react";
import { GetServerSideProps } from "next";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";

import { getAll, getByToken } from "@/api/user.api";

import { OrganizersView } from "@/views";

import { withLayout } from "@/layout/Layout";

const OrganizersPage: FC<OrganizersPageProps> = ({ organizers }) => {
  return <OrganizersView organizers={organizers} />;
};

export const getServerSideProps: GetServerSideProps<OrganizersPageProps> = async ({ req: { cookies } }) => {
  const { data: organizers } = await getAll(RoleEnum.ORGANIZER);

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      organizers,
      token,
      user,
    },
  };
};

export default withLayout(OrganizersPage);

interface OrganizersPageProps extends Record<string, unknown> {
  organizers: IUser[];
  token: string | null;
  user: IUser | null;
}

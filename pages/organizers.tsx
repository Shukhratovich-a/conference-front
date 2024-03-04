import { FC } from "react";
import { GetStaticProps } from "next";

import { RoleEnum } from "@/enums/role.enum";
import { IUser } from "@/types/user.type";

import { getAll } from "@/api/user.api";

import { OrganizersView } from "@/views";

import { withLayout } from "@/layout/Layout";

const OrganizersPage: FC<OrganizersPageProps> = ({ organizers }) => {
  return <OrganizersView organizers={organizers} />;
};

export const getStaticProps: GetStaticProps<OrganizersPageProps> = async () => {
  const { data: organizers } = await getAll(RoleEnum.ORGANIZER);

  return {
    props: {
      organizers,
    },
    revalidate: 10,
  };
};

export default withLayout(OrganizersPage);

interface OrganizersPageProps extends Record<string, unknown> {
  organizers: IUser[];
}

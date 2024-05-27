import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { RoleEnum } from "@/enums/role.enum";
import { IHeader } from "@/types/header.type";
import { IUser } from "@/types/user.type";
import { IOrganizerType } from "@/types/organizer.type";

import { get as getHeader } from "@/api/header.api";
import { getByToken } from "@/api/user.api";
import { getAll as getAllOrganizerTypes } from "@/api/organizer.api";

import { OrganizersView } from "@/views";

import { withLayout } from "@/layout/Layout";

const OrganizersPage: FC<OrganizersPageProps> = ({ organizerTypes }) => {
  return <OrganizersView organizerTypes={organizerTypes} />;
};

export const getServerSideProps: GetServerSideProps<OrganizersPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });
  const { data: organizerTypes } = await getAllOrganizerTypes({ language: locale });

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      header,
      organizerTypes,
      token,
      user,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(OrganizersPage);

interface OrganizersPageProps extends Record<string, unknown> {
  header: IHeader;
  organizerTypes: IOrganizerType[];
  token: string | null;
  user: IUser | null;
}

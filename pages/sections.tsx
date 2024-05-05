import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ISection } from "@/types/section.type";
import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";

import { get as getHeader } from "@/api/header.api";
import { getByToken } from "@/api/user.api";
import { getAll } from "@/api/section.api";

import { SectionsView } from "@/views";

import { withLayout } from "@/layout/Layout";

const SectionPage: FC<SectionPageProps> = ({ sections }) => {
  return <SectionsView sections={sections} />;
};

export const getServerSideProps: GetServerSideProps<SectionPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });
  const { data: sections } = await getAll({ language: locale });

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      header,
      sections,
      token,
      user,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(SectionPage);

interface SectionPageProps extends Record<string, unknown> {
  header: IHeader;
  sections: ISection[];
  token: string | null;
  user: IUser | null;
}

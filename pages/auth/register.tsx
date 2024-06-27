import { FC } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { ISection } from "@/types/section.type";

import { get as getHeader } from "@/api/header.api";
import { getAll as getAllSections } from "@/api/section.api";

import { withLayout } from "@/layout/Layout";

import { RegisterView } from "@/views";

const RegisterPage: FC<RegisterPageProps> = ({ sections }) => {
  return <RegisterView sections={sections} />;
};

export const getStaticProps: GetStaticProps<RegisterPageProps> = async ({ locale }) => {
  try {
    const { data: header } = await getHeader({ language: locale });
    const { data: sections } = await getAllSections({ language: locale });

    return {
      props: {
        header,
        token: null,
        user: null,
        sections,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(RegisterPage);

interface RegisterPageProps extends Record<string, unknown> {
  header: IHeader;
  token: string | null;
  user: IUser | null;
  sections: ISection[];
}

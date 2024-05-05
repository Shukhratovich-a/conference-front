import { FC } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";

import { get as getHeader } from "@/api/header.api";

import { withLayout } from "@/layout/Layout";

import { RegisterView } from "@/views";

const RegisterPage: FC<RegisterPageProps> = () => {
  return <RegisterView />;
};

export const getStaticProps: GetStaticProps<RegisterPageProps> = async ({ locale }) => {
  const { data: header } = await getHeader({ language: locale });

  return {
    props: {
      header,
      token: null,
      user: null,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(RegisterPage);

interface RegisterPageProps extends Record<string, unknown> {
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

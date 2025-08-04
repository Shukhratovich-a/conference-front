import { FC } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";

import { get as getHeader } from "@/api/header.api";

import { withLayout } from "@/layout/Layout";

import { LoginView } from "@/views";

const LoginPage: FC<LoginPageProps> = () => {
  return <LoginView />;
};

export const getStaticProps: GetStaticProps<LoginPageProps> = async ({ locale }) => {
  const { data: header } = await getHeader({ language: locale === 'ar' ? 'ru' : locale });

  return {
    props: {
      header,
      token: null,
      user: null,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(LoginPage);

interface LoginPageProps extends Record<string, unknown> {
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

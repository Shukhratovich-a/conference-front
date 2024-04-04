import { FC } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";

import { withLayout } from "@/layout/Layout";

import { LoginView } from "@/views";

const LoginPage: FC<LoginPageProps> = () => {
  return <LoginView />;
};

export const getStaticProps: GetStaticProps<LoginPageProps> = async ({ locale }) => {
  return {
    props: {
      token: null,
      user: null,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(LoginPage);

interface LoginPageProps extends Record<string, unknown> {
  token: string | null;
  user: IUser | null;
}

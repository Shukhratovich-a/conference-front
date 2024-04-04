import { FC } from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";

import { withLayout } from "@/layout/Layout";

import { RegisterView } from "@/views";

const RegisterPage: FC<RegisterPageProps> = () => {
  return <RegisterView />;
};

export const getStaticProps: GetStaticProps<RegisterPageProps> = async ({ locale }) => {
  return {
    props: {
      token: null,
      user: null,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(RegisterPage);

interface RegisterPageProps extends Record<string, unknown> {
  token: string | null;
  user: IUser | null;
}

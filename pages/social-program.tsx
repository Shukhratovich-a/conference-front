import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";

import { getByToken } from "@/api/user.api";

import { withLayout } from "@/layout/Layout";

const SocialProgramPage: FC<SocialProgramPageProps> = () => {
  return (
    <>
      <p>Organizing Committee is planning to offer an interesting social program including excursions and banquets.</p>

      <p>Information about the social program will be announced lately.</p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SocialProgramPageProps> = async ({ req: { cookies }, locale }) => {
  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      token,
      user,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(SocialProgramPage);

interface SocialProgramPageProps extends Record<string, unknown> {
  token: string | null;
  user: IUser | null;
}

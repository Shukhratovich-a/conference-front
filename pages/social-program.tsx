import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { ISocialProgram } from "@/types/social-program.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { get as getSocialProgram } from "@/api/social-program.api";

import { withLayout } from "@/layout/Layout";

const SocialProgramPage: FC<SocialProgramPageProps> = ({ socialProgram }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: socialProgram.body }} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SocialProgramPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale === 'ar' ? 'ru' : locale });
  const { data: socialProgram } = await getSocialProgram({ language: locale === 'ar' ? 'ru' : locale });

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      header,
      token,
      user,
      socialProgram,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(SocialProgramPage);

interface SocialProgramPageProps extends Record<string, unknown> {
  socialProgram: ISocialProgram;
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

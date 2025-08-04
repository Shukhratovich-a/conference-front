import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { ISubmission } from "@/types/submission.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { get as getSubmission } from "@/api/submission.api";

import { withLayout } from "@/layout/Layout";

const SubmissionPage: FC<SubmissionPageProps> = ({ submission }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: submission.body }} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SubmissionPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale === 'ar' ? 'ru' : locale });
  const { data: submission } = await getSubmission({ language: locale === 'ar' ? 'ru' : locale });

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
      submission,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(SubmissionPage);

interface SubmissionPageProps extends Record<string, unknown> {
  submission: ISubmission;
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

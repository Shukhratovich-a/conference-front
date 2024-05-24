import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { IDate } from "@/types/date.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { get as getDates } from "@/api/date.api";

import { withLayout } from "@/layout/Layout";

const ImportantDatePage: FC<ImportantDatePageProps> = ({ date }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: date.body }}></div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ImportantDatePageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });
  const { data: date } = await getDates({ language: locale });

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      header,
      date,
      token,
      user,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(ImportantDatePage);

interface ImportantDatePageProps extends Record<string, unknown> {
  date: IDate;
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

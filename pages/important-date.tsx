import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";

import { get as getHeader } from "@/api/header.api";
import { getByToken } from "@/api/user.api";

import { withLayout } from "@/layout/Layout";

const ImportantDatePage: FC<ImportantDatePageProps> = () => {
  return (
    <>
      <ul>
        <li>Registration and Abstract submission deadline: 01.06.2024</li>

        <li>Notification of acceptance deadline: 30.06.2024</li>

        <li>Full paper submission deadline: 30.11.2024</li>
      </ul>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ImportantDatePageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });

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
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(ImportantDatePage);

interface ImportantDatePageProps extends Record<string, unknown> {
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

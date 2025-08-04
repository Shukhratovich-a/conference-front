import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { IFee } from "@/types/fee.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { get as getFee } from "@/api/fee.api";

import { withLayout } from "@/layout/Layout";

import { ConferenceFeesView } from "@/views";

const HomePage: FC<ConferenceFeesPageProps> = ({ fee }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: fee.body }} />
      {/* <ConferenceFeesView /> */}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ConferenceFeesPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale === 'ar' ? 'ru' : locale });
  const { data: fee } = await getFee({ language: locale === 'ar' ? 'ru' : locale });

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
      fee,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(HomePage);

interface ConferenceFeesPageProps extends Record<string, unknown> {
  fee: IFee;
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

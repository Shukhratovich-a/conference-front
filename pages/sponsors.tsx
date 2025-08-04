import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { ISponsor } from "@/types/sponsor.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { getAll as getAllSponsors } from "@/api/sponsor.api";

import { SponsorsView } from "@/views";

import { withLayout } from "@/layout/Layout";

const SponsorsPage: FC<SponsorsPageProps> = ({ sponsors }) => {
  return (
    <>
      <SponsorsView sponsors={sponsors} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SponsorsPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale === 'ar' ? 'ru' : locale });
  const { data: sponsors } = await getAllSponsors({ language: locale === 'ar' ? 'ru' : locale });

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
      sponsors,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(SponsorsPage);

interface SponsorsPageProps extends Record<string, unknown> {
  sponsors: ISponsor[];
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

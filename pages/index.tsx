import { FC } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { ISection } from "@/types/section.type";
import { IHomepage } from "@/types/homepage.type";
import { IHeader } from "@/types/header.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { get as getHomepage } from "@/api/homepage.api";
import { getAll as getAllSection } from "@/api/section.api";

import { withLayout } from "@/layout/Layout";

import { HomeView } from "@/views";

const HomePage: FC<HomePageProps> = ({ homepage, sections }) => {
  return (
    <>
      <Head>
        <title>{`${homepage.title}`}</title>
      </Head>

      <HomeView homepage={homepage} sections={sections} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });
  const { data: homepage } = await getHomepage({ language: locale });
  const { data: sections } = await getAllSection({ language: locale });

  header.poster = homepage.poster;

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
      header,
      homepage,
      sections,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(HomePage);

interface HomePageProps extends Record<string, unknown> {
  token: string | null;
  user: IUser | null;
  header: IHeader;
  homepage: IHomepage;
  sections: ISection[];
}

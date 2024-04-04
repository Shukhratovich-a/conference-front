import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { ISection } from "@/types/section.type";
import { IHomepage } from "@/types/homepage.type";

import { getByToken } from "@/api/user.api";
import { get } from "@/api/homepage.api";
import { getAll } from "@/api/section.api";

import { withLayout } from "@/layout/Layout";

import { HomeView } from "@/views";

const HomePage: FC<HomePageProps> = ({ homepage, sections }) => {
  return (
    <>
      <HomeView homepage={homepage} sections={sections} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ req: { cookies }, locale }) => {
  const { data: homepage } = await get({ language: locale });
  const { data: sections } = await getAll({ language: locale });

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
  homepage: IHomepage;
  sections: ISection[];
}

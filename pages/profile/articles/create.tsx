import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { ISection } from "@/types/section.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { getAll as getAllSections } from "@/api/section.api";

import { withLayout } from "@/layout/Layout";

import { CreateArticlesView } from "@/views";

const CreateArticlePage: FC<CreateArticlePageProps> = ({ sections }) => {
  return <CreateArticlesView sections={sections} />;
};

export const getServerSideProps: GetServerSideProps<CreateArticlePageProps> = async ({ locale, req: { cookies } }) => {
  const { data: header } = await getHeader({ language: locale });

  const token = cookies.token;
  if (!token) return { notFound: true };

  try {
    const { data: user } = await getByToken(token);
    if (!user) return { notFound: true };

    const { data: sections } = await getAllSections();

    return {
      props: {
        header,
        user,
        token,
        sections,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(CreateArticlePage);

interface CreateArticlePageProps extends Record<string, unknown> {
  header: IHeader;
  sections: ISection[];
  user: IUser;
  token: string;
}

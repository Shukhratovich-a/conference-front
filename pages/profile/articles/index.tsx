import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { IArticle } from "@/types/article.type";

import { get as getHeader } from "@/api/header.api";
import { getByToken as getUserByToken } from "@/api/user.api";
import { getByToken as getArticlesByToken } from "@/api/article.api";

import { withLayout } from "@/layout/Layout";

import { ArticlesView } from "@/views";

const ArticlesPage: FC<ArticlesPageProps> = ({ articles }) => {
  return <ArticlesView articles={articles} />;
};

export const getServerSideProps: GetServerSideProps<ArticlesPageProps> = async ({ locale, req: { cookies } }) => {
  const { data: header } = await getHeader({ language: locale });

  const token = cookies.token;
  if (!token) return { notFound: true };

  try {
    const { data: user } = await getUserByToken(token);
    if (!user) return { notFound: true };

    const { data: articles } = await getArticlesByToken(token);

    return {
      props: {
        header,
        user,
        token,
        articles,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(ArticlesPage);

interface ArticlesPageProps extends Record<string, unknown> {
  header: IHeader;
  user: IUser | null;
  token: string | null;
  articles: IArticle[];
}

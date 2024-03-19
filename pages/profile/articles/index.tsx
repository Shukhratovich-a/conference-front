import { GetServerSideProps } from "next";

import { IUser } from "@/types/user.type";
import { IArticle } from "@/types/article.type";

import { getByToken as getUserByToken } from "@/api/user.api";
import { getByToken as getArticlesByToken } from "@/api/article.api";

import { withLayout } from "@/layout/Layout";

import { ArticlesView } from "@/views";
import { FC } from "react";

const ArticlesPage: FC<ArticlesPageProps> = ({ articles }) => {
  return <ArticlesView articles={articles} />;
};

export const getServerSideProps: GetServerSideProps<ArticlesPageProps> = async ({ params, req: { cookies } }) => {
  const token = cookies.token;
  if (!token) return { notFound: true };

  try {
    const { data: user } = await getUserByToken(token);
    if (!user) return { notFound: true };

    const { data: articles } = await getArticlesByToken(token);

    return { props: { user, token, articles } };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(ArticlesPage);

interface ArticlesPageProps extends Record<string, unknown> {
  user: IUser | null;
  token: string | null;
  articles: IArticle[];
}

import { FC } from "react";
import { GetServerSideProps } from "next";

import { IUser } from "@/types/user.type";
import { ITopic } from "@/types/topic.type";

import { getByToken } from "@/api/user.api";
import { getAll as getAllTopics } from "@/api/topic.api";

import { withLayout } from "@/layout/Layout";

import { CreateArticlesView } from "@/views";

const CreateArticlePage: FC<CreateArticlePageProps> = ({ topics }) => {
  return <CreateArticlesView topics={topics} />;
};

export const getServerSideProps: GetServerSideProps<CreateArticlePageProps> = async ({ params, req: { cookies } }) => {
  const token = cookies.token;
  if (!token) return { notFound: true };

  try {
    const { data: user } = await getByToken(token);
    if (!user) return { notFound: true };

    const { data: topics } = await getAllTopics();

    return { props: { user, token, topics } };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(CreateArticlePage);

interface CreateArticlePageProps extends Record<string, unknown> {
  topics: ITopic[];
  user: IUser;
  token: string;
}

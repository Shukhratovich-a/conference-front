import { FC } from "react";
import { GetServerSideProps } from "next";

import { ITopic } from "@/types/topic.type";
import { IUser } from "@/types/user.type";

import { getByToken } from "@/api/user.api";
import { getAll } from "@/api/topic.api";

import { TopicsView } from "@/views";

import { withLayout } from "@/layout/Layout";

const TopicPage: FC<TopicPageProps> = ({ topics }) => {
  return <TopicsView topics={topics} />;
};

export const getServerSideProps: GetServerSideProps<TopicPageProps> = async ({ req: { cookies } }) => {
  const { data: topics } = await getAll();

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      topics,
      token,
      user,
    },
  };
};

export default withLayout(TopicPage);

interface TopicPageProps extends Record<string, unknown> {
  topics: ITopic[];
  token: string | null;
  user: IUser | null;
}

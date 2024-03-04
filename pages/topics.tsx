import { FC } from "react";
import { GetStaticProps } from "next";

import { ITopic } from "@/types/topic.type";

import { getAll } from "@/api/topic.api";

import { TopicsView } from "@/views";

import { withLayout } from "@/layout/Layout";

const TopicPage: FC<TopicPageProps> = ({ topics }) => {
  return <TopicsView topics={topics} />;
};

export const getStaticProps: GetStaticProps<TopicPageProps> = async () => {
  const { data: topics } = await getAll();

  return {
    props: {
      topics,
    },
    revalidate: 10,
  };
};

export default withLayout(TopicPage);

interface TopicPageProps extends Record<string, unknown> {
  topics: ITopic[];
}

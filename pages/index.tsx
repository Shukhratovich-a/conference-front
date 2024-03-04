import { FC } from "react";
import { GetStaticProps } from "next";

import { withLayout } from "@/layout/Layout";

const HomePage: FC<HomePageProps> = ({}) => {
  return <>Home</>;
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  return {
    props: {},
    revalidate: 10,
  };
};

export default withLayout(HomePage);

interface HomePageProps extends Record<string, unknown> {}

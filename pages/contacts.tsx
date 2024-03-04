import { FC } from "react";
import { GetStaticProps } from "next";

import { withLayout } from "@/layout/Layout";

const ContactPage: FC<ContactPageProps> = ({}) => {
  return <>Home</>;
};

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  return {
    props: {},
    revalidate: 10,
  };
};

export default withLayout(ContactPage);

interface ContactPageProps extends Record<string, unknown> {}

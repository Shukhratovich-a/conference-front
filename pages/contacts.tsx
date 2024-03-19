import { FC } from "react";
import { GetServerSideProps } from "next";

import { IUser } from "@/types/user.type";

import { getByToken } from "@/api/user.api";

import { withLayout } from "@/layout/Layout";

const ContactPage: FC<ContactPageProps> = ({}) => {
  return <>Home</>;
};

export const getServerSideProps: GetServerSideProps<ContactPageProps> = async ({ req: { cookies } }) => {
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
    },
  };
};

export default withLayout(ContactPage);

interface ContactPageProps extends Record<string, unknown> {
  token: string | null;
  user: IUser | null;
}

import { FC } from "react";
import { GetServerSideProps } from "next";

import { IUser } from "@/types/user.type";

import { getByToken } from "@/api/user.api";

import { withLayout } from "@/layout/Layout";

import { ProfileView } from "@/views";

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  return user ? <ProfileView user={user} /> : <></>;
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ params, req: { cookies } }) => {
  const token = cookies.token;
  if (!token) return { notFound: true };

  try {
    const { data: user } = await getByToken(token);
    if (!user) return { notFound: true };

    return { props: { user, token } };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(ProfilePage);

interface ProfilePageProps {
  user: IUser | null;
  token: string | null;
}

import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";

import { get as getHeader } from "@/api/header.api";
import { getByToken } from "@/api/user.api";

import { withLayout } from "@/layout/Layout";

import { ProfileView } from "@/views";

const ProfilePage: FC<ProfilePageProps> = ({ user }) => {
  return user ? <ProfileView user={user} /> : <></>;
};

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({ locale, req: { cookies } }) => {
  const { data: header } = await getHeader({ language: locale });

  const token = cookies.token;
  if (!token) return { notFound: true };

  try {
    const { data: user } = await getByToken(token);
    if (!user) return { notFound: true };

    return {
      props: {
        header,
        user,
        token,
        ...(await serverSideTranslations(String(locale))),
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(ProfilePage);

interface ProfilePageProps {
  header: IHeader;
  user: IUser | null;
  token: string | null;
}

import { GetServerSideProps } from "next";

import { IUser } from "@/types/user.type";

import { withLayout } from "@/layout/Layout";

import {} from "@/views";
import { getById } from "@/api/user.api";

const ProfilePage = () => {
  return <>profile</>;
};

export const getServerSideProps: GetServerSideProps<IProfilePage> = async ({ params, req: { cookies } }) => {
  if (!params) return { notFound: true };

  const id = params.id;
  if (!id) return { notFound: true };

  const token = cookies.token;
  if (!token) return { notFound: true };

  try {
    const { data: user } = await getById(id as string, token);
    if (!user) return { notFound: true };

    return { props: { user } };
  } catch {
    return { notFound: true };
  }
};

export default withLayout(ProfilePage);

interface IProfilePage {
  user: IUser;
}

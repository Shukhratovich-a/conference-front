import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { IAccommodation } from "@/types/accommodation.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { get as getAccommodation } from "@/api/accommodation.api";

import { withLayout } from "@/layout/Layout";

import { AccommodationView } from "@/views";

const HomePage: FC<AccommodationPageProps> = ({ accommodation }) => {
  return (
    <>
      <AccommodationView accommodation={accommodation} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<AccommodationPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });
  const { data: accommodation } = await getAccommodation({ language: locale });

  const token = cookies.token || null;
  let user = null;

  if (token) {
    const { data } = await getByToken(token);
    user = data;
  }

  return {
    props: {
      header,
      token,
      user,
      accommodation,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(HomePage);

interface AccommodationPageProps extends Record<string, unknown> {
  accommodation: IAccommodation;
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

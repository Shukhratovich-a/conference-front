import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { IVenue } from "@/types/venue.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { get as getVenue } from "@/api/venue.api";

import { withLayout } from "@/layout/Layout";

const VenuePage: FC<VenuePageProps> = ({ venue }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: venue.body }} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<VenuePageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale === 'ar' ? 'ru' : locale });
  const { data: venue } = await getVenue({ language: locale === 'ar' ? 'ru' : locale });

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
      venue,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(VenuePage);

interface VenuePageProps extends Record<string, unknown> {
  venue: IVenue;
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";
import { IContact } from "@/types/contact.type";

import { getByToken } from "@/api/user.api";
import { get as getHeader } from "@/api/header.api";
import { get as getContact } from "@/api/contact.api";

import { withLayout } from "@/layout/Layout";

const ContactPage: FC<ContactPageProps> = ({ contact }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: contact.body }} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ContactPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale === 'ar' ? 'ru' : locale });
  const { data: contact } = await getContact({ language: locale === 'ar' ? 'ru' : locale });

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
      contact,
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(ContactPage);

interface ContactPageProps extends Record<string, unknown> {
  contact: IContact;
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

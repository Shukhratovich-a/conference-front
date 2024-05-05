import { FC } from "react";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IUser } from "@/types/user.type";
import { IHeader } from "@/types/header.type";

import { get as getHeader } from "@/api/header.api";
import { getByToken } from "@/api/user.api";

import { withLayout } from "@/layout/Layout";

const SubmissionPage: FC<SubmissionPageProps> = ({}) => {
  return (
    <>
      <p>
        Authors who wish to submit their 3 (three) pages extended abstract for COIA-2024, first should register, get
        username and password. The abstracts less than 3 pages will not be accepted.
      </p>
      <p>
        The PROCEEDINGS of COIA 2018 and COIA 2020 are indexed in Web of Science: Conference Proceedings Citation Index.
      </p>
      <p>
        After creating your account, please log in using your email and your chosen password. Choose a topic and
        according to the following style: Sample.zip
      </p>

      <p>
        Abstracts should be prepared in LaTeX. Prepare your abstract and generate a .zip file following the guidelines
        below. Compress together the source .tex file, the figure file and the .pdf file to a single .zip file. The
        names of .tex, .pdf and .zip file should be in the form: surname_name.tex, surname_name.pdf, surname_name.zip.
        In your conference account click the “New” button, further complete the form (category, title of talk, abstract)
        and upload only the surname_name.zip file and Submit your abstract. You may access your account in Registration
        section.
      </p>

      <p>The abstracts not meetings the requirements will not be considered.</p>
      <p>
        Our advice is to submit early which will give you extra time to identify and resolve any problems before the
        system closes. The registration/abstract submission deadline on June 1, 2024.
      </p>
      <p>
        After a careful reviewing process, all accepted abstracts will be published in the Proceedings of the
        Conference, which will be submitted for indexing to Web of Science: Conference Proceedings Citation Index.
      </p>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<SubmissionPageProps> = async ({ req: { cookies }, locale }) => {
  const { data: header } = await getHeader({ language: locale });

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
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withLayout(SubmissionPage);

interface SubmissionPageProps extends Record<string, unknown> {
  header: IHeader;
  token: string | null;
  user: IUser | null;
}

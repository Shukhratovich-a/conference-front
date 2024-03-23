import { FC } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import "@/styles/globals.scss";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Conf</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />

        <meta property="og:local" content="en_EN" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default appWithTranslation(App);

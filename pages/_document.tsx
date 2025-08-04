import Document, { DocumentContext, DocumentInitialProps, Head, Html, Main, NextScript } from "next/document";

import i18nextConfig from "../../next-i18next.config.js";

class MyDocument extends Document {
  static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  };

  render(): JSX.Element {
    const currentLocale = this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale;

    const isRtl = currentLocale === "ar" ? "content-rtl" : "";

    return (
      <Html dir={currentLocale === "ar" ? "rtl" : "ltr"} lang={currentLocale}>
        <Head />

        <body className={isRtl}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

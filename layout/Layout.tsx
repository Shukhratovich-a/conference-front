import { FC } from "react";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import cn from "classnames";

import { LayoutProps } from "./Layout.props";

import { Header } from "./Header/Header.component";
import { Footer } from "./Footer/Footer.component";
import { Sidebar } from "./Sidebar/Sidebar.component";

import styles from "./Layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const Layout: FC<LayoutProps> = ({ children, className, ...props }) => {
  return (
    <div className={cn(styles.layout, inter.className)} {...props}>
      <Header className={cn(styles.header)} />

      <main className={cn(styles.main)}>
        <Sidebar />

        <div>{children}</div>
      </main>

      <Footer className={cn(styles.footer)} />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };
};

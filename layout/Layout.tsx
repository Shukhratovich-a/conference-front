import { FC } from "react";
import { Inter } from "next/font/google";
import cn from "classnames";

import { LayoutProps } from "./Layout.props";

import { ILayout } from "@/types/layout.type";

import { AuthContextProvider } from "@/contexts/auth.context";
import { HeaderContextProvider } from "@/contexts/header.context";

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

export const withLayout = <T extends ILayout>(Component: FC<T>) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AuthContextProvider token={props.token} user={props.user}>
        <HeaderContextProvider header={props.header}>
          <Layout>
            <Component {...props} />
          </Layout>
        </HeaderContextProvider>
      </AuthContextProvider>
    );
  };
};

"use client";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { Istok_Web } from "next/font/google";
import Head from "next/head";
import { useFirstLoad } from "@/services/useFirstLoad";
import Aside from "@/components/Aside/Aside";
import Tabs from "@/components/Tabs/Tabs";
import { store } from "../store";
import "./styles/global.css";

const istokWeb = Istok_Web({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  useFirstLoad();

  return (
    <html lang="ru">
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#3d3d3d" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="use-credentials"
        />

        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className={istokWeb.className} suppressHydrationWarning>
        <div>
          <Provider store={store}>
            <Aside />
            <main className="container">
              <Tabs />

              <div className="content">{children}</div>
            </main>
          </Provider>
        </div>
      </body>
    </html>
  );
}

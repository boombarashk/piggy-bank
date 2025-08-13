import React from "react";
import Head from "next/head";
import useData from "@/services/useData";

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Piggy Bank App</title>
      </Head>

      <main className="container">{children}</main>
    </>
  );
}

import React, { ReactNode } from "react";
import Head from "next/head";

export default function RootLayout({ children }: { children: ReactNode }) {
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

import React, { useEffect } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";

import { getCategoriesData } from "@/services/reducers/categories";

export default function RootLayout({ children }) {
  const dispatch = useDispatch();
  // Запрашиваем категории при загрузке страницы
  useEffect(() => {
    dispatch(getCategoriesData());
  }, []);

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

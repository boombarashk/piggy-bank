import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

import { PIGGY_BANK_START, TAB_PAGES } from "../consts";
import { store } from "../store";
import RootLayout from "./layout";
import Tabs from "@/components/Tabs/Tabs";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const appStarted = localStorage.getItem(PIGGY_BANK_START);
    if (appStarted === "true" && router.pathname === "/") {
      router.push(TAB_PAGES[1].route);
    } else {
      localStorage.setItem(PIGGY_BANK_START, "true");
    }

    return () => {
      localStorage.removeItem(PIGGY_BANK_START);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <RootLayout>
        <Tabs />

        <div className="content">
          <Component {...pageProps} />
        </div>
      </RootLayout>
    </Provider>
  );
}

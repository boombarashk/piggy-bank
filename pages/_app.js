import React from "react";
import { Provider } from "react-redux";

import { store } from "../store";
import RootLayout from "./layout";
import Tabs from "@/components/Tabs/Tabs";

export default function App({ Component, pageProps }) {
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

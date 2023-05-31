import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/Header";
import Layout from "@/layout/layout";
import { ThemeProvider } from "next-themes";
import ThemeChange from "@/components/ThemeChange";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { PersistStore } from "@/app/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={PersistStore}>
        <ThemeProvider enableSystem={true} attribute="class">
          <SessionProvider>
            <Header />
            <Layout>
              <Component {...pageProps} />
            </Layout> 
            <ThemeChange />
          </SessionProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

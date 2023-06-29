import "@/styles/globals.css";
import store, { PersistStore } from "@/app/store";
import Header from "@/components/Header";
import ThemeChange from "@/components/ThemeChange";
import Layout from "@/layout/layout";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

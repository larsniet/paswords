import "../styles/globals.css";

import { Background, Navbar } from "@components";
import { ThemeContextProvider } from "@themes/themeContext";
import Head from "next/head";

import type { AppProps } from "next/app";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeContextProvider>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
                />
            </Head>

            <Background />
            <Navbar />
            <main className="flex flex-col pt-20 sm:pt-0 min-h-screen justify-center">
                <Component {...pageProps} />
            </main>
        </ThemeContextProvider>
    );
}

export default MyApp;

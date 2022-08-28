import React from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import NoSsr from "@mui/material/NoSsr";
import Head from "next/head";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Popvote</title>
        <meta name="theme-color" content="#000000" />
      </Head>
      <NoSsr>
        <Component {...pageProps} />
      </NoSsr>
    </SessionProvider>
  );
}

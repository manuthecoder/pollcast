import React from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import NoSsr from "@mui/material/NoSsr";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <NoSsr>
        <Component {...pageProps} />
      </NoSsr>
    </SessionProvider>
  );
}

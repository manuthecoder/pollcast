import React from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import NoSsr from "@mui/material/NoSsr";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  const [theme, setTheme] = React.useState<any>("light");

  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  global.setTheme = setTheme;
  global.theme = theme;

  return (
    <ThemeProvider theme={darkTheme}>
      <SessionProvider session={session}>
        <Head>
          <title>Popvote</title>
          <meta name="theme-color" content="#000000" />
        </Head>
        <NoSsr>
          <Component {...pageProps} />
        </NoSsr>
      </SessionProvider>
    </ThemeProvider>
  );
}

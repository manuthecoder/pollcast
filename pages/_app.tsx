import React from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import NoSsr from "@mui/material/NoSsr";
import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Cookies from "js-cookie";

function App({ Component, pageProps: { session, ...pageProps } }: any) {
  const [theme, setDarkMode] = React.useState<any>(
    Cookies.get("theme") || "light"
  );

  const darkTheme = createTheme({
    palette: {
      mode: theme,
      background: {
        default: theme === "dark" ? "hsl(195, 29%, 11%)" : "#fff",
      },
    },
  });

  const setTheme = (theme: any) => {
    Cookies.set("theme", theme, { expires: 7 });
    setDarkMode(theme);
  };

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

export default function Render({ Component, pageProps }: any) {
  return (
    <NoSsr>
      <App pageProps={pageProps} Component={Component} />
    </NoSsr>
  );
}

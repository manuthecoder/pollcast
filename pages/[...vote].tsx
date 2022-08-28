import { Layout } from "../components/Layout";
import useSWR from "swr";
// import io from "socket.io-client";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import MuiLink from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import { ImagePopup } from "../components/Poll/ImagePopup";
import { Sidebar } from "../components/Poll/Sidebar";
import { Choice } from "../components/Poll/Choice";

export function Loading({ mb = false, width = "100%", height }: any) {
  return (
    <Skeleton
      width={width}
      height={height}
      variant="rectangular"
      sx={{ borderRadius: 5, mb: mb ? 2 : 0 }}
    />
  );
}

export default function Vote() {
  // useEffect(() => {
  //   socketInitializer();
  // }, []);

  // const socketInitializer = async () => {
  //   // We just call it because we don't need anything else out of it
  //   await fetch("/api/socket");

  //   socket = io();

  //   socket.on("newIncomingMessage", (msg: any) => {
  //     alert(msg);
  //   });
  // };

  // const sendMessage = async (msg: string) => {
  //   socket.emit("createdMessage", msg);
  //   // alert("Sent!");
  // };

  const url =
    "/api/fetchPoll?" +
    new URLSearchParams({
      id: window.location.href.split("/vote/")[1],
    });
  // alert(url);
  const { error, data } = useSWR(url, () =>
    fetch(url).then((res) => res.json())
  );

  return (
    <Layout>
      <Box sx={{ p: 5 }}>
        <Container sx={{ mt: 10 }}>
          {/* <Alert severity="info" sx={{ mb: 3, mt: -9 }}>
            This poll is linked to an assignment. Complete the poll in order to
            finish the assignment
          </Alert> */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <Typography variant="h3" sx={{ fontWeight: "900" }}>
                {data ? data.question : <Loading height={50} />}
              </Typography>
              <Typography variant="h6" sx={{ my: 2, mt: 1 }}>
                {data ? (
                  data.description
                ) : (
                  <Loading height={20} width={"70%"} />
                )}
              </Typography>
              <Typography variant="body2" sx={{ my: 0, mt: -1 }}>
                Asked{" "}
                <Link href="/">
                  <MuiLink sx={{ cursor: "pointer" }}>1 hour ago</MuiLink>
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={7}>
              {data ? (
                <>
                  {data.choices.map((choice: any, key: string) => (
                    <Choice choice={choice} key={key.toString()} />
                  ))}
                </>
              ) : (
                <>
                  {[...new Array(5)].map((_, i) => (
                    <Loading height={50} width={"100%"} key={i.toString()} mb />
                  ))}
                </>
              )}
            </Grid>
            <Grid item xs={12} sm={5}>
              <ImagePopup data={data} />
              <Sidebar />
            </Grid>
          </Grid>

          {error && <>An error occured while trying to fetch the poll</>}
        </Container>
      </Box>
    </Layout>
  );
}

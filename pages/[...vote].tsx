import { Layout } from "../components/Layout";
import useSWR from "swr";
// import io from "socket.io-client";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Link from "next/link";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import MuiLink from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";

// let socket: any;

function Loading({ width = "100%", height }: any) {
  return (
    <Skeleton
      width={width}
      height={height}
      variant="rectangular"
      sx={{ borderRadius: 5 }}
    />
  );
}

function Choice({ choice }: any) {
  return (
    <Card sx={{ mb: 2, borderRadius: 5, background: "#eee" }} elevation={0}>
      <CardActionArea
        sx={{
          "& span": {
            transition: "none!important",
          },
        }}
      >
        <CardContent>
          <Typography>{choice.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Vote() {
  const [open, setOpen] = useState<boolean>(false);
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
        {data && (
          <Dialog
            open={open}
            scroll="body"
            onClose={() => setOpen(false)}
            BackdropProps={{
              sx: {
                background: "rgba(0,0,0,0.1)",
                backdropFilter: "blur(15px)",
              },
            }}
            sx={{
              "& .MuiDialog-paper": {
                boxShadow: "none",
                background: "black",
                color: "white",
                borderRadius: 5,
              },
            }}
          >
            <Box
              sx={{
                "& img": {
                  width: "100%",
                  maxWidth: { sm: "500px" },
                },
              }}
            >
              <picture>
                <img src={data.image} alt="Poll Image" draggable={false} />
              </picture>
            </Box>
          </Dialog>
        )}
        <Container sx={{ mt: 10 }}>
          <Typography variant="h3" sx={{ fontWeight: "900" }}>
            {data ? data.question : <Loading height={50} />}
          </Typography>
          <Typography variant="h6" sx={{ my: 2, mt: 1 }}>
            {data ? data.description : <Loading height={20} width={"70%"} />}
          </Typography>
          <Typography variant="body2" sx={{ my: 0, mt: -1 }}>
            Asked{" "}
            <Link href="/">
              <MuiLink sx={{ cursor: "pointer" }}>1 hour ago</MuiLink>
            </Link>
          </Typography>
          {data ? (
            <Box sx={{ mt: 5 }}>
              {data.choices.map((choice: any, key: string) => (
                <Choice choice={choice} key={key.toString()} />
              ))}
            </Box>
          ) : (
            <Loading height={50} width={"100%"} />
          )}
          {/* {JSON.stringify(data)} */}
          {data ? (
            <>
              {data.image && (
                <Card
                  sx={{
                    width: "100%",
                    height: "auto",
                    minHeight: "200px",
                    background: "#000",
                    borderRadius: 5,
                    position: "relative",
                  }}
                  elevation={0}
                >
                  <CardActionArea onClick={() => setOpen(true)}>
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        m: 2,
                        pointerEvents: "none",
                        color: "#fff",
                        backdropFilter: "blur(10px)",
                        background: "#000",
                      }}
                      size="small"
                    >
                      <span className="material-symbols-rounded">
                        fullscreen
                      </span>
                    </IconButton>
                    <CardMedia sx={{ width: "100%", height: "200px" }}>
                      <picture>
                        <img
                          src={data.image}
                          alt="attached image"
                          draggable={false}
                          style={{ width: "100%" }}
                        />
                      </picture>
                    </CardMedia>
                  </CardActionArea>
                </Card>
              )}
            </>
          ) : (
            <Loading height={"100px"} width={"200px"} />
          )}
          {error && <>An error occured while trying to fetch the poll</>}
        </Container>
      </Box>
    </Layout>
  );
}

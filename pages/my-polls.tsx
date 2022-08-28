import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Layout } from "../components/Layout";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import useSWR from "swr";
import { CardMedia } from "@mui/material";
import { PollCard } from "../components/Feed/PollCard";

function MyPolls({ session }: any) {
  const url = "/api/feed?userId=" + session.id;
  const { data, error } = useSWR(url, async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  return (
    <Container sx={{ p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        component="div"
        sx={{
          mt: { xs: 3, sm: 10 },
          mb: 4,
          pb: 0,
          fontWeight: "900",
        }}
      >
        My polls
      </Typography>
      {error && (
        <Card
          sx={{
            p: 3,
            borderRadius: 5,
            mb: 2,
            backgroundColor: "rgba(200,200,200,.3)",
            boxShadow: "0",
          }}
        >
          An error occurred while loading your polls.
        </Card>
      )}
      {data ? (
        <>
          {data.length == 0 && (
            <Card
              sx={{
                p: 3,
                borderRadius: 5,
                mb: 2,
                backgroundColor: "rgba(200,200,200,.3)",
                boxShadow: "0",
              }}
            >
              Nothing yet!
            </Card>
          )}
          {data.map((poll: any, id: number) => (
            <PollCard poll={poll} key={id} />
          ))}
        </>
      ) : (
        <>
          {[...new Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              animation="wave"
              sx={{ p: 2, mt: 2, borderRadius: 5 }}
              width="100%"
              height={229}
            />
          ))}
        </>
      )}
    </Container>
  );
}

export default function Component() {
  const { data: session }: any = useSession();

  return <Layout>{session && <MyPolls session={session} />}</Layout>;
}

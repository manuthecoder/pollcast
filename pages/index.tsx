import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Layout } from "../components/Layout";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import useSWR from "swr";

export default function Component() {
  const { data: session }: any = useSession();
  const url = "/api/feed";
  const { data, error } = useSWR(url, async (url) => {
    const res = await fetch(url);
    return res.json();
  });

  return (
    <>
      <Layout>
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ p: 5, pb: 0, fontWeight: "900" }}
        >
          Explore
        </Typography>
      </Layout>
      <Box
        sx={{
          p: 3,
          pt: 0,
        }}
      >
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
            An error occurred while loading your feed.
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
              <Card variant="outlined" sx={{ p: 2, m: 2 }} key={id.toString()}>
                <CardActionArea>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {poll.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {poll.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
      </Box>
    </>
  );
}

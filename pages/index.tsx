import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Layout } from "../components/Layout";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import CardActionArea from "@mui/material/CardActionArea";
import useSWR from "swr";
import { CardMedia } from "@mui/material";

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
        <Container>
          <Typography
            variant="h4"
            gutterBottom
            component="div"
            sx={{
              mt: { xs: 5, sm: 10 },
              mb: 5,
              pb: 0,
              fontWeight: "900",
            }}
          >
            Explore
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
                <Link key={id.toString()} href={`/vote/${poll.id}`}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardActionArea>
                      {poll.image && (
                        <CardMedia>
                          <picture>
                            <img
                              src={poll.image}
                              alt="Poll Image"
                              draggable="false" // Prevents image from being dragged
                              style={{
                                width: "100%",
                                maxHeight: "300px",
                                objectFit: "cover",
                                height: "auto",
                              }}
                            />
                          </picture>
                        </CardMedia>
                      )}
                      <CardContent>
                        <Typography variant="h5" component="div" gutterBottom>
                          {poll.question}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {poll.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
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
      </Layout>
    </>
  );
}

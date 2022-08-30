import useSWR from "swr";
import { Layout } from "../../components/Layout";
// import io from "socket.io-client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Choice } from "../../components/Poll/Choice";
import { ImagePopup } from "../../components/Poll/ImagePopup";
import { Sidebar } from "../../components/Poll/Sidebar";
import toast from "react-hot-toast";

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

function RenderPoll({ data }: any) {
  const [voted, setVote] = useState<any>(false);
  const [votes, setVotes] = useState<any>(
    data.choices.map((c: any) => {
      return { id: c.id, votes: c.votes };
    })
  );
  const updateVotes = () => {
    const url =
      "/api/fetchPoll?" +
      new URLSearchParams({
        id: window.location.href.split("/vote/")[1],
      });
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        // alert(1);
        setVotes(
          data.choices.map((c: any) => {
            return { id: c.id, votes: c.votes };
          })
        );
      });
  };
  const { data: session }: any = useSession();

  return (
    <Layout>
      <Box sx={{ p: { xs: 3, sm: 5 } }}>
        <Container sx={{ mt: { xs: 5, sm: 10 } }}>
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
                Asked by{" "}
                <Link href={"/users/" + (data && data.user.id)}>
                  <MuiLink sx={{ cursor: "pointer" }}>
                    {data && data.user.name}
                  </MuiLink>
                </Link>
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={7}>
              {data ? (
                <>
                  {data.choices.map((choice: any, key: string) => (
                    <Choice
                      updateVotes={updateVotes}
                      key={key.toString()}
                      choice={choice}
                      // Currently selected choice
                      voted={voted}
                      setVote={setVote}
                      // Votes
                      votes={votes}
                      // Session
                      session={session}
                    />
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
              <Sidebar
                voteCount={data.choices
                  .map((item: any) => item.votes.length)
                  .reduce((prev: number, next: number) => prev + next)}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Layout>
  );
}

export default function Vote() {
  const [voted, setVote] = useState<any>(false);
  const votes = [];

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
    <>
      {data ? <RenderPoll data={data} /> : <>Loading..</>}
      {error && <>An error occured while trying to fetch the poll</>}
    </>
  );
}

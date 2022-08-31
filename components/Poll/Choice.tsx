import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { MathComponent } from "mathjax-react";
import NoSsr from "@mui/material/NoSsr";
import "katex/dist/katex.min.css";
import LinearProgress from "@mui/material/LinearProgress";
// @ts-ignore
import { InlineMath, BlockMath } from "react-katex";
const reactStringReplace = require("react-string-replace");
import { cyan } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import { useSession, signIn, signOut } from "next-auth/react";

export function Choice({
  i,
  choice,
  setVote,
  voted,
  session,
  votes,
  updateVotes,
}: any) {
  const str = choice.name;
  const regex = /\{{{(.*?)\}}}/g;
  const txt = reactStringReplace(str, regex, (match: any, i: number) => (
    <div className="math">
      <InlineMath>{match}</InlineMath>
    </div>
  ));
  const [loading, setLoading] = React.useState(false);

  const totalVotes = votes
    .map((item: any) => item.votes.length)
    .reduce((prev: number, next: number) => prev + next);
  return (
    <NoSsr>
      <Card
        onClick={() => {
          if (!session) {
            signIn();
            return false;
          }
          setLoading(true);
          fetch(
            "/api/vote?" +
              new URLSearchParams({
                pollId: window.location.href.split("/vote/")[1],
                choiceId: choice.id,
                userId: session.id,
              })
          )
            .then((res) => res.json())
            .then((res) => {
              setLoading(false);
              setVote(choice.id);
              updateVotes();
            });
        }}
        sx={{
          mb: 2,
          borderRadius: 6,
          transition: "all 0.2s",
          background:
            global.theme === "dark"
              ? "hsl(195, 29%, 11%)"
              : "rgba(200,200,200,.3)",

          ...(voted && {
            pointerEvents: "none",
          }),
          position: "relative",
          ...(voted === choice.id && {
            borderRadius: 4,
            background:
              global.theme === "dark"
                ? "hsl(195, 29%, 15%)!important"
                : "rgba(200,200,200,.3)!important",
          }),
        }}
        elevation={0}
      >
        {voted && (
          <LinearProgress
            variant="determinate"
            value={(votes[i].votes.length / totalVotes) * 100}
            sx={{
              opacity: 0.5,
              height: "100%",
              "& *": {
                // borderRadius: 3,
              },
              width: "100%",
              position: "absolute",
              top: 0,
            }}
          />
        )}
        {voted && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              position: "absolute",
              right: 20,
              top: "50%",
              transform: "translateY(-50%)",
              ...(voted === choice.id && {
                mr: 3.5,
              }),
            }}
          >
            {Math.round((votes[i].votes.length / totalVotes) * 100)}%
          </Typography>
        )}
        <CardActionArea
          disabled={voted}
          sx={{
            "& span": {
              transition: "none!important",
            },
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <Typography>{txt}</Typography>
            <Box
              sx={{
                transition: "transform .2s",
                ml: "auto",
                display: "flex",
                p: 0.2,
                fontSize: "15px",
                w: 20,
                h: 20,
                borderRadius: "50%",
                alignItems: "center",
                transform:
                  loading || voted === choice.id ? "scale(1)" : "scale(.6)",
                opacity: loading || voted === choice.id ? "1" : "0",
                justifyContent: "center",
                background: loading ? "transparent" : cyan["A700"],
                color: "#000",
              }}
            >
              {loading ? (
                <CircularProgress sx={{ m: 0.3 }} size="18px" />
              ) : (
                <span
                  style={{ fontSize: "18px" }}
                  className="material-symbols-rounded"
                >
                  check
                </span>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </NoSsr>
  );
}

import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { MathComponent } from "mathjax-react";
import NoSsr from "@mui/material/NoSsr";
import "katex/dist/katex.min.css";
// @ts-ignore
import { InlineMath, BlockMath } from "react-katex";
const reactStringReplace = require("react-string-replace");

export function Choice({ choice }: any) {
  const str = choice.name;
  const regex = /\{{{(.*?)\}}}/g;
  const txt = reactStringReplace(str, regex, (match: any, i: number) => (
    <div className="math">
      <InlineMath>{match}</InlineMath>
    </div>
  ));

  return (
    <NoSsr>
      <Card
        sx={{
          mb: 2,
          borderRadius: 5,
          background:
            global.theme === "dark"
              ? "hsl(195, 29%, 11%)"
              : "rgba(200,200,200,.3)",
        }}
        elevation={0}
      >
        <CardActionArea
          sx={{
            "& span": {
              transition: "none!important",
            },
          }}
        >
          <CardContent>
            <Typography>{txt}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </NoSsr>
  );
}

import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

export function PollCard({ poll }: any) {
  return (
    <Link href={`/vote/${poll.id}`}>
      <Card
        sx={{
          mb: 2,
          boxShadow: 0,
          borderRadius: 5,
          background: "rgba(200,200,200,.3)",
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{ fontWeight: "900" }}
            >
              {poll.question}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {poll.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";

export function Choice({ choice }: any) {
  return (
    <Card
      sx={{ mb: 2, borderRadius: 5, background: "rgba(200,200,200,.3)" }}
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
          <Typography>{choice.name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

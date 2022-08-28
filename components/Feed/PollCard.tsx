import React from "react";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

function DeleteModal({ poll }: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <>
      <IconButton>
        <span
          onClick={() => setOpen(true)}
          className="material-symbols-rounded"
        >
          delete
        </span>
      </IconButton>
      <SwipeableDrawer
        anchor="bottom"
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,.15)",
            backdropFilter: "blur(15px)",
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            mx: "auto",
            p: 3,
            maxWidth: "500px",
            borderRadius: "20px 20px 0 0",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Box
          sx={{
            width: 100,
            height: "5px",
            background: "rgba(200,200,200,.3)",
            borderRadius: 5,
            mb: 3,
            mx: "auto",
          }}
        ></Box>
        <Typography variant="h6" sx={{ textAlign: "center", mb: 5 }}>
          Are you sure you want to delete this poll? This action cannot be
          undone
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              borderRadius: 9999,
              mt: 1,
              border: "2px solid transparent !important",
              textTransform: "none",
            }}
            size="large"
            disableElevation
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              mt: 1,
              borderRadius: 9999,
              borderWidth: "2px!important",
              textTransform: "none",
            }}
            size="large"
            disableElevation
          >
            Cancel
          </Button>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export function PollCard({ showOptions = false, poll }: any) {
  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 0,
        borderRadius: 5,
        background:
          global.theme === "dark"
            ? "hsl(195, 29%, 11%)"
            : "rgba(200,200,200,.3)",
      }}
    >
      <Link href={`/vote/${poll.id}`}>
        <CardActionArea
          sx={{
            borderRadius: 0,
            p: 3,
            "& *": { transition: "none!important" },
          }}
        >
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
        </CardActionArea>
      </Link>

      {showOptions && (
        <Box sx={{ textAlign: "right", p: 2 }}>
          <IconButton sx={{ mr: 1 }}>
            <span className="material-symbols-rounded">edit</span>
          </IconButton>
          <DeleteModal poll={poll} />
        </Box>
      )}
    </Card>
  );
}

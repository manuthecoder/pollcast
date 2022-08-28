import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { cyan } from "@mui/material/colors";
import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { getInitials } from "./Layout";

export function ProfileMenu({ session }: any) {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <SwipeableDrawer
        anchor="bottom"
        open={open}
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
            maxWidth: "500px",
            borderRadius: "20px 20px 0 0",
          },
        }}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableSwipeToOpen
      >
        <Box
          sx={{
            width: 100,
            height: "5px",
            background: "rgba(200,200,200,.3)",
            borderRadius: 5,
            my: 3,
            mx: "auto",
          }}
        ></Box>

        <Button
          sx={{ py: 2 }}
          onClick={() => {
            global.setTheme(global.theme === "dark" ? "light" : "dark");
          }}
        >
          Toggle dark mode
        </Button>
      </SwipeableDrawer>

      <Avatar
        alt="Profile Picture"
        onClick={() => setOpen(true)}
        sx={{
          background: cyan["A700"],
          color: "#000",
          width: 35,
          fontSize: "16px",
          height: 35,
        }}
      >
        {getInitials(session?.user?.name).toUpperCase()}
      </Avatar>
    </>
  );
}

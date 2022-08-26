import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import { useSession, signIn, signOut } from "next-auth/react";

export function Layout({ children }: any) {
  const { data: session }: any = useSession();
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper square sx={{ pb: "50px" }} elevation={0}>
        {children}
        {/* <List sx={{ mb: 2 }}>
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader sx={{ bgcolor: "background.paper" }}>
                  Today
                </ListSubheader>
              )}
              {id === 3 && (
                <ListSubheader sx={{ bgcolor: "background.paper" }}>
                  Yesterday
                </ListSubheader>
              )}
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List> */}
      </Paper>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          top: "auto",
          bottom: 0,
          p: 1,
          color: "#fff",
          background: "#000",
        }}
      >
        <Toolbar>
          <IconButton color="inherit" size="large" sx={{ ml: -1, mr: 0.5 }}>
            <span className="material-symbols-outlined">account_circle</span>
          </IconButton>
          <IconButton color="inherit" size="large" sx={{ ml: 0, mr: 0.5 }}>
            <span className="material-symbols-outlined">search</span>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Fab
            variant="extended"
            disableRipple
            sx={{
              borderRadius: 0,
              background: "#101010 !important",
              color: "#fff",
              boxShadow: "0px !important",
              transition: "all .2s",
              "&:active": {
                transform: "scale(0.9)",
                transition: "none",
              },
              // textTransform: "none",
              gap: 2,
            }}
            aria-label="add"
          >
            <span className="material-symbols-rounded">edit</span>
            Create
          </Fab>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

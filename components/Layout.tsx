import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { cyan } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import { useSession } from "next-auth/react";
import * as React from "react";
import Link from "next/link";
import Check from "@mui/icons-material/Check";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import { StepIconProps } from "@mui/material/StepIcon";
import { CreatePollDialog } from "./CreatePollDialog";

export const PopvoteConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#784af4",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 5,
  },
}));

const PopvoteStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(
  ({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
      color: "#784af4",
    }),
    "& .PopvoteStepIcon-completedIcon": {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
    "& .PopvoteStepIcon-circle": {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
  })
);

export function PopvoteStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <PopvoteStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="PopvoteStepIcon-completedIcon" />
      ) : (
        <div className="PopvoteStepIcon-circle" />
      )}
    </PopvoteStepIconRoot>
  );
}

// Get initials from name
function getInitials(name: string) {
  const parts = name.split(" ");
  let initials = parts[0].substring(0, 1).toUpperCase();
  if (parts.length > 1) {
    initials += parts[1].substring(0, 1).toUpperCase();
  }
  return initials;
}

export function Layout({ poll = false, children }: any) {
  const { data: session }: any = useSession();
  return (
    <React.Fragment>
      <CssBaseline />
      <Paper
        square
        sx={{
          ...(!poll && {
            pt: { xs: "0", sm: "70px" },
            pb: { xs: "50px", sm: "0" },
          }),
          ...(poll && {
            ml: { sm: "95px" },
          }),
        }}
        elevation={0}
      >
        {children}
      </Paper>
      {!poll && (
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            top: { xs: "auto", sm: 0 },
            bottom: { xs: 0, sm: "auto" },
            p: 1,
            color: "#fff",
            background: "#000",
          }}
        >
          <Toolbar>
            <Box sx={{ order: { sm: 2 }, display: "flex" }}>
              <IconButton
                color="inherit"
                size="small"
                sx={{
                  ml: { xs: -1, sm: 0 },
                  mr: { xs: 0.5, sm: 0 },
                  order: { sm: 3 },
                }}
              >
                {session ? (
                  <Avatar
                    alt="Profile Picture"
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
                ) : (
                  <Link href="/api/auth/signin?callbackUrl=/">
                    <Button
                      sx={{
                        background: "#fff!important",
                        textTransform: "none",
                        color: "#000",
                        px: 2,
                        borderRadius: 5,
                      }}
                      size="large"
                    >
                      Sign in
                    </Button>
                  </Link>
                )}
              </IconButton>
              <IconButton
                color="inherit"
                size="large"
                sx={{ ml: 0.5, mr: 0.5 }}
              >
                <span className="material-symbols-outlined">search</span>
              </IconButton>
              {session && (
                <>
                  <IconButton
                    color="inherit"
                    size="large"
                    sx={{ ml: 0, mr: 0.5 }}
                  >
                    <span className="material-symbols-outlined">poll</span>
                  </IconButton>
                  <IconButton
                    color="inherit"
                    size="large"
                    sx={{ ml: 0, mr: 0.8 }}
                  >
                    <span className="material-symbols-outlined">atr</span>
                  </IconButton>
                </>
              )}
            </Box>
            <Box
              sx={{
                order: { xs: 2, sm: 1 },
                mr: { sm: "auto" },
                display: "flex",
                alignItems: "center",
                gap: 2,
                ml: { xs: "auto", sm: "unset" },
              }}
            >
              <Link href="/">
                <Typography
                  variant="h5"
                  sx={{
                    display: { xs: "none", sm: "block" },
                    cursor: "pointer",
                    fontWeight: "900",
                  }}
                >
                  Popvote
                </Typography>
              </Link>
              {session && <CreatePollDialog />}
            </Box>
          </Toolbar>
        </AppBar>
      )}
      {poll && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "95px",
            background: "black",
            height: "100vh",
          }}
        >
          <picture>
            <img
              src="https://i.ibb.co/H4SQNtG/image.png"
              alt="logo"
              style={{ width: "100%" }}
            />
          </picture>
        </Box>
      )}
    </React.Fragment>
  );
}

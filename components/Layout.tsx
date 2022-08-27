import LoadingButton from "@mui/lab/LoadingButton";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import { cyan } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import * as React from "react";

import Check from "@mui/icons-material/Check";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

import SwipeableViews from "react-swipeable-views";

import { StepIconProps } from "@mui/material/StepIcon";

const PopvoteConnector = styled(StepConnector)(({ theme }) => ({
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
    borderRadius: 1,
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

function PopvoteStepIcon(props: StepIconProps) {
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

function CreatePollDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(true);
  const [options, setOptions] = React.useState([]);
  const steps = ["Enter details", "Add choices", "Share!"];
  const [step, setStep] = React.useState(0);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: (values) => {
      if (step === steps.length - 1) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setStep(0);
        }, 2000);
      } else if (step == 0) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setStep(1);
        }, 2000);
      } else if (step == 1) {
        setStep(2);
      }
      // alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <Fab
        onClick={() => setOpen(true)}
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
      <SwipeableDrawer
        anchor="bottom"
        BackdropProps={{
          sx: {
            background: "rgba(0,0,0,.1)",
            backdropFilter: "blur(10px)",
          },
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "28px 28px 0 0",
            minHeight: "20vh",
          },
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
      >
        <Box
          sx={{
            mx: "auto",
            background: "#eee",
            my: 2,
            height: 5,
            width: 30,
            borderRadius: 99,
          }}
        />
        <Stepper
          alternativeLabel
          activeStep={step}
          connector={<PopvoteConnector />}
          sx={{ mb: 3 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={PopvoteStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ p: 2 }}>
          <form onSubmit={formik.handleSubmit}>
            <SwipeableViews index={step} disabled animateHeight>
              <Box sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="What's your poll about?"
                  value={formik.values.name}
                  required
                  autoComplete="off"
                  disabled={loading}
                  placeholder="What's your favorite color?"
                  onChange={formik.handleChange}
                  InputProps={{
                    sx: {
                      borderRadius: 0,
                    },
                  }}
                />
                <Button
                  sx={{
                    mb: 2,
                    mt: 1,
                    borderRadius: 0,
                    textTransform: "none",
                    color: "#fff",
                    transition: "all .2s",
                    "&:active": {
                      transform: "scale(0.95)",
                      transition: "none",
                    },
                    gap: 2,
                    background: "#000",
                    "&:hover": {
                      background: "#202020",
                    },
                  }}
                  variant="contained"
                  disableElevation
                >
                  <span className="material-symbols-rounded">upload</span>
                  Upload a header image
                </Button>
                <Divider
                  sx={{
                    my: !collapsed ? 0 : 1,
                    transition: "all .2s",
                    borderColor: "#eee",
                  }}
                />
                <Button
                  fullWidth
                  onClick={() => setCollapsed(!collapsed)}
                  sx={{
                    justifyContent: "start",
                    borderRadius: 0,
                    textTransform: "none",
                    transition: "all .2s",
                    mb: 2,
                    ...(!collapsed && {
                      background: "#eee!important",
                      px: 3,
                      py: 2,
                      mb: 0,
                    }),
                  }}
                >
                  More options
                  <span
                    className="material-symbols-rounded"
                    style={{
                      transition: "all .2s",
                      display: "inline-block",
                      transform: collapsed ? "rotate(0deg)" : "rotate(180deg)",
                    }}
                  >
                    expand_more
                  </span>
                </Button>
                <Collapse in={!collapsed}>
                  <Box
                    sx={{
                      background: "#eee",
                      p: 3,
                      pt: 1,
                      mb: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      label="Add a description (optional)"
                      value={formik.values.description}
                      autoComplete="off"
                      disabled={loading}
                      onChange={formik.handleChange}
                      sx={{ mb: 2 }}
                      InputProps={{
                        sx: {
                          borderRadius: 0,
                        },
                      }}
                    />
                  </Box>
                </Collapse>
              </Box>
              <Box>
                {options.map((option, index) => (
                  <Box key={index.toString()}>{option}</Box>
                ))}
                {options.length === 0 && (
                  <Box sx={{ p: 2, my: 2, background: "rgba(200,200,200,.2)" }}>
                    No answers created
                  </Box>
                )}
                <TextField
                  fullWidth
                  id="option"
                  placeholder={formik.values.name}
                  name="option"
                  sx={{ mb: 3, mt: 1 }}
                  InputProps={{
                    sx: {
                      borderRadius: 0,
                    },
                  }}
                  label="Add an option"
                />
              </Box>
            </SwipeableViews>
            <LoadingButton
              loading={loading}
              fullWidth
              variant="outlined"
              color="inherit"
              sx={{
                borderRadius: 0,
                color: "#000",
                py: 1.5,
                borderWidth: "2px!important",
                boxShadow: "0px !important",
                transition: "all .2s",
                "&:active": {
                  transform: "scale(0.96)",
                  transition: "none",
                },
                gap: 2,
              }}
              type="submit"
            >
              Continue
              <span className="material-symbols-rounded">chevron_right</span>
            </LoadingButton>
          </form>
        </Box>
      </SwipeableDrawer>
    </>
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
          <IconButton color="inherit" size="small" sx={{ ml: -1, mr: 0.5 }}>
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
              <Button
                sx={{
                  background: "#fff!important",
                  textTransform: "none",
                  color: "#000",
                  px: 2,
                  borderRadius: 0,
                }}
                size="large"
              >
                Sign in
              </Button>
            )}
          </IconButton>
          <IconButton color="inherit" size="large" sx={{ ml: 0.5, mr: 0.5 }}>
            <span className="material-symbols-outlined">search</span>
          </IconButton>
          <IconButton color="inherit" size="large" sx={{ ml: 0, mr: 0.5 }}>
            <span className="material-symbols-outlined">atr</span>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <CreatePollDialog />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

import LoadingButton from "@mui/lab/LoadingButton";
import QRCode from "react-qr-code";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Grow from "@mui/material/Grow";
import { TransitionProps } from "@mui/material/transitions";
import SwipeableViews from "react-swipeable-views";
import { PopvoteConnector, PopvoteStepIcon } from "./Layout";
import { useSession } from "next-auth/react";

export function CreatePollDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState<any>([]);
  const [openQr, setOpenQr] = React.useState(false);
  const steps = ["Options", "Add choices", "Share!"];
  const [step, setStep] = React.useState(0);
  const [url, setUrl] = React.useState("https://popvote.ml/polls/1");
  const { data: session }: any = useSession();

  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Grow in={openQr} ref={ref} {...props} />;
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      image: "",
    },
    onSubmit: (values) => {
      if (step === steps.length - 1) {
        setStep(0);
        formik.resetForm();
      } else if (step == 0) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setStep(1);
        }, 2000);
      } else if (step == 1) {
        setLoading(false);
        const params = new URLSearchParams({
          question: values.name,
          description: values.description,
          image: values.image,
          user: session.id,
          choices: JSON.stringify(options),
        });
        alert(params);
        fetch("/api/createPoll?" + params)
          .then((res) => res.json())
          .then((data: any) => {
            alert(JSON.stringify(data));
            setLoading(false);
            setUrl("https://popvote.ml/vote/" + data.id);
            setStep((prevActiveStep) => prevActiveStep + 1);
          });
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
          borderRadius: 5,
          background: "#101010 !important",
          color: "#fff",
          boxShadow: "0px !important",
          transition: "all .2s",
          "&:active": {
            transform: "scale(0.9)",
            transition: "none",
          },
          textTransform: "none",
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
            maxWidth: "700px",
            mx: "auto",
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
          {/* {JSON.stringify(session)} */}
          <form onSubmit={formik.handleSubmit}>
            <SwipeableViews index={step} disabled animateHeight>
              <Box sx={{ my: 1 }}>
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
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    sx={{
                      mb: 2,
                      mt: 1,
                      borderRadius: 5,
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
                </Box>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Add a description (optional)"
                  value={formik.values.description}
                  autoComplete="off"
                  disabled={loading}
                  onChange={formik.handleChange}
                  sx={{ mb: 4 }}
                />
              </Box>
              <Box>
                <Box
                  sx={{
                    mb: 2,
                    height: "200px",
                    overflowY: "scroll",
                    borderRadius: 5,
                    background: "#eee",
                    scrollBehavior: "smooth",
                  }}
                  id="optionList"
                >
                  {options.map((option: any, index: any) => (
                    <Box
                      sx={{
                        p: 2,
                        borderBottom: "1px solid rgba(200,200,200,.3)",
                        display: "flex",
                        alignItems: "center",
                      }}
                      key={index.toString()}
                    >
                      {option}
                      <IconButton
                        sx={{ ml: "auto" }}
                        onClick={() => {
                          setOptions(
                            options.filter(
                              (o: string, i: number) => i !== index
                            )
                          );
                        }}
                      >
                        <span className="material-symbols-rounded">delete</span>
                      </IconButton>
                    </Box>
                  ))}
                  {options.length === 0 && (
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      animation="wave"
                      sx={{
                        p: 2,
                        height: "200px",
                        display: "flex",
                        width: "100%",
                        borderRadius: 5,
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(200,200,200,.2)",
                      }}
                    >
                      No answers created
                    </Skeleton>
                  )}
                </Box>

                <TextField
                  autoComplete="off"
                  fullWidth
                  placeholder={formik.values.name}
                  name="option"
                  onKeyDown={(e) => {
                    if (e.code === "Enter") {
                      e.preventDefault();
                      document.getElementById("createOption")!.click();
                    }
                  }}
                  sx={{ my: 1 }}
                  disabled={options.length >= 6}
                  id="optionText"
                  label={
                    options.length <= 6 ? "Add an option" : "Maximum 6 options"
                  }
                />
                <Box sx={{ display: "flex" }}>
                  <Button
                    type="button"
                    variant="contained"
                    disableElevation
                    disabled={options.length >= 6}
                    sx={{
                      mb: 2,
                      gap: 2,
                      mt: 1,
                      background: "#000",
                      color: "#fff",
                      "&:hover": {
                        background: "#000",
                      },
                      ml: "auto",
                      textTransform: "none",
                      borderRadius: 9999,
                    }}
                    size="large"
                    id="createOption"
                    onClick={() => {
                      const e: any = document.getElementById("optionText");
                      const f = [...new Set([...options, e!.value.toString()])];
                      setOptions(f);
                      e!.value = "";

                      setTimeout(() => {
                        document
                          .getElementById("optionList")!
                          .scrollTo(99999, 999999);
                      }, 100);
                    }}
                  >
                    <span className="material-symbols-rounded">add</span> Add
                  </Button>
                </Box>
              </Box>
              <Box>
                <TextField value={url} fullWidth />
                <Button
                  onClick={() => {
                    setOpenQr(true);
                    document.body.requestFullscreen();
                  }}
                  fullWidth
                  disableElevation
                  size="large"
                  sx={{
                    my: 2,
                    borderRadius: 9,
                    py: 1.5,
                    textTransform: "none",
                  }}
                  variant="contained"
                >
                  Present QR code
                </Button>
                <Dialog
                  open={openQr}
                  PaperProps={{
                    sx: {
                      width: "100vw",
                      height: "100vh",
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      maxWidth: "100vw",
                      minWidth: "100vw",
                      minHeight: "100vh",
                      maxHeight: "100vh",
                    },
                  }}
                >
                  <IconButton
                    sx={{ position: "fixed", top: 16, right: 16 }}
                    onClick={() => {
                      setOpenQr(false);
                    }}
                  >
                    <span className="material-symbols-rounded">close</span>
                  </IconButton>
                  <Box
                    sx={{
                      maxWidth: "500px",
                      border: "1px solid #eee",
                      borderRadius: 5,
                      p: 5,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="h5" sx={{ mb: 4, fontWeight: "900" }}>
                      Scan the QR code to start voting
                    </Typography>
                    <Box
                      sx={{
                        background: "#eee",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 4,
                        borderRadius: 5,
                      }}
                    >
                      <QRCode value={url} bgColor="#eee" />
                    </Box>
                  </Box>
                </Dialog>
              </Box>
            </SwipeableViews>
            <LoadingButton
              loading={loading}
              disabled={step === 1 && options.length < 2}
              fullWidth
              variant="contained"
              color="inherit"
              sx={{
                borderRadius: 9999,
                color: "#fff",
                ...(!loading && {
                  background: "#000",
                  "&:hover": {
                    background: "#000",
                  },
                }),
                py: 1.5,
                boxShadow: "0px !important",
                textTransform: "none",
                gap: 2,
              }}
              disableElevation
              type="submit"
            >
              {step === 1 && options.length < 2
                ? "Please add at least 2 options"
                : "Continue"}
              {options.length > 2 && (
                <span className="material-symbols-rounded">chevron_right</span>
              )}
            </LoadingButton>
          </form>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { Loading } from "../../pages/[...vote]";

// let socket: any;
export function ImagePopup({ data }: any) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {data ? (
        <Box sx={{ color: "white" }}>
          {data.image && (
            <Card
              sx={{
                mb: 2,
                width: "100%",
                height: "auto",
                minHeight: "200px",
                background: "#000",
                borderRadius: 5,
                color: "#fff",
                position: "relative",
              }}
              color="inherit"
              elevation={0}
            >
              <CardActionArea onClick={() => setOpen(true)}>
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    m: 2,
                    pointerEvents: "none",
                    color: "#fff",
                    backdropFilter: "blur(10px)",
                    background: "#000",
                  }}
                  size="small"
                >
                  <span className="material-symbols-rounded">fullscreen</span>
                </IconButton>
                <CardMedia sx={{ width: "100%", height: "200px" }}>
                  <picture>
                    <img
                      src={data.image}
                      alt="attached image"
                      draggable={false}
                      style={{ width: "100%" }}
                    />
                  </picture>
                </CardMedia>
              </CardActionArea>
            </Card>
          )}
        </Box>
      ) : (
        <Box sx={{ mb: 1 }}>
          <Loading height={"300px"} width={"100%"} />
        </Box>
      )}
      {data && (
        <Dialog
          open={open}
          scroll="body"
          onClose={() => setOpen(false)}
          BackdropProps={{
            sx: {
              background: "rgba(0,0,0,0.1)",
              backdropFilter: "blur(15px)",
            },
          }}
          sx={{
            "& .MuiDialog-paper": {
              boxShadow: "none",
              background: "black",
              color: "white",
              borderRadius: 5,
            },
          }}
        >
          <Box
            sx={{
              "& img": {
                width: "100%",
                maxWidth: { sm: "500px" },
              },
            }}
          >
            <picture>
              <img src={data.image} alt="Poll Image" draggable={false} />
            </picture>
          </Box>
        </Dialog>
      )}
    </>
  );
}

import React from "react";
import { useGoogleOneTapLogin, GoogleLogin } from "@react-oauth/google";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Login() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },

    onError: () => {
      alert(1);
      console.log("Login Failed");
    },
  });

  return (
    <Box
      sx={{
        background: "url(https://source.unsplash.com/random/1920x1080)",
        backgroundSize: "cover",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          backdropFilter: "blur(30px)",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(10px)",
            border: "3px solid #fff",
            p: 2,
            width: "450px",
            maxWidth: "calc(100vw - 20px)",
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, mt: 4 }}>
            Sign in to Votecast
          </Typography>
          <Box
            sx={{
              width: "200px",
              mx: "auto",
              p: 1,
              overflow: "hidden",
            }}
          >
            <GoogleLogin
              theme="filled_black"
              size="large"
              shape="pill"
              ux_mode="redirect"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

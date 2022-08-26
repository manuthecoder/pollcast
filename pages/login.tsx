import React from "react";
import { useGoogleOneTapLogin, GoogleLogin } from "@react-oauth/google";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Login() {
  useGoogleOneTapLogin({
    onSuccess: (credentialResponse: any) => {
      alert(JSON.stringify(credentialResponse));
      fetch(
        "/api/login?" +
          new URLSearchParams({
            client_id: credentialResponse.clientId,
            credential: credentialResponse.credential,
          })
      )
        .then((res) => res.json())
        .then((res) => {
          alert(JSON.stringify(res));
        });
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
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          backdropFilter: "blur(30px)",
          background: "rgba(255,255,255,.8)",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Box
          sx={{
            width: "500px",
            maxWidth: "calc(100vw - 40px)",
            background: "#fff",
            m: "20px",
            boxShadow: "5px 5px #000",
          }}
        >
          <Box sx={{ p: 7, px: 5 }}>
            <Typography variant="h4" sx={{ fontWeight: "900", mb: 2 }}>
              Sign in to Votecast
            </Typography>
            <Typography sx={{ fontWeight: "500", mb: 2 }}>
              Use your account to create and share polls
            </Typography>
            <GoogleLogin
              theme="filled_black"
              size="large"
              shape="square"
              login_uri="/api/login"
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

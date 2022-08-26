import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Layout } from "../components/Layout";
import Typography from "@mui/material/Typography";

export default function Component() {
  const { data: session }: any = useSession();
  return (
    <>
      <Layout>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ p: 5, pb: 0 }}
        >
          Explore
        </Typography>
      </Layout>
    </>
  );
}

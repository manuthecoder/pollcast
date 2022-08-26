import { useSession, signIn, signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Component() {
  const { data: session }: any = useSession();
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Next.js
          </Typography>
          {session ? (
            <Button color="inherit" onClick={() => signOut()}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={() => signIn()}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

export function Sidebar({ voteCount }: { voteCount: number }) {
  return (
    <>
      <Card
        sx={{
          boxShadow: 0,
          backgroundColor:
            global.theme === "dark"
              ? "hsl(195, 29%, 11%)"
              : "rgba(200,200,200,.3)",
          borderRadius: 5,
          p: 1.5,
          mb: 2,
        }}
      >
        <CardContent>
          <Typography variant="h2" sx={{ mb: 1 }}>
            {voteCount.toString()}
          </Typography>
          <Typography variant="h5">Votes</Typography>
        </CardContent>
      </Card>
      <Card
        sx={{
          boxShadow: 0,
          backgroundColor:
            global.theme === "dark"
              ? "hsl(195, 29%, 11%)"
              : "rgba(200,200,200,.3)",
          borderRadius: 5,
          p: 1.5,
          mb: 2,
        }}
      >
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            More
          </Typography>
          <Button
            variant="contained"
            disableElevation
            sx={{
              background: "#000!important",
              color: "#fff",
              mb: 1,
              borderRadius: 9,
              textTransform: "none",
              gap: 2,
            }}
          >
            <span className="material-symbols-rounded">qr_code</span> Share QR
            code
          </Button>
          <br />
          <Button
            variant="contained"
            disableElevation
            sx={{
              background: "#000!important",
              color: "#fff",
              borderRadius: 9,
              textTransform: "none",
              gap: 2,
              mb: 1,
            }}
          >
            <span className="material-symbols-rounded">atr</span>
            Assign to group/class
          </Button>
          <br />
          <Button
            variant="contained"
            disableElevation
            sx={{
              background: "#000!important",
              color: "#fff",
              borderRadius: 9,
              textTransform: "none",
              gap: 2,
              mb: 1,
            }}
          >
            <span className="material-symbols-rounded">flag</span>
            Report abuse
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

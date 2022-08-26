const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "449499569548-9sre05lnsjanl4fq2l7tb10p0c5ap1ek.apps.googleusercontent.com"
);
export default async function verify(req, res) {
  const ticket = await client.verifyIdToken({
    idToken: req.query.token,
    audience: req.query.clientId, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
  res.json(userid);
}

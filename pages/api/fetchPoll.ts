import { findPoll } from "../../prisma/user";

const handler = async (req: any, res: any) => {
  const feed = await findPoll(req.query.id);
  console.log(feed);
  res.status(200).json(feed);
};
export default handler;

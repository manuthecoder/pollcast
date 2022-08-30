import { findPoll } from "../../prisma/user";

const handler = async (req: any, res: any) => {
  const poll = await findPoll(req.query.id);
  res.status(200).json(poll);
};
export default handler;

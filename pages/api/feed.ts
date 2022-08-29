import { getFeed } from "../../prisma/user";

const handler = async (req: any, res: any) => {
  const feed = await getFeed(req.query.userId ? req.query.userId : undefined);
  res.status(200).json(feed.reverse());
};
export default handler;

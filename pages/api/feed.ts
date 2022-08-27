import { getFeed } from "../../prisma/user";

const handler = async (req: any, res: any) => {
  const feed = await getFeed();
  console.log(feed);
  res.status(200).json(feed);
};
export default handler;

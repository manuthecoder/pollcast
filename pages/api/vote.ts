import { vote } from "../../prisma/user";

const handler = async (req: any, res: any) => {
  const result: any = await vote(
    req.query.pollId,
    req.query.choiceId,
    req.query.userId
  );
  res.status(200).json(result);
};
export default handler;

import { createPoll } from "../../prisma/user";

const handler = async (req: any, res: any) => {
  const id = await createPoll({
    question: req.query.question,
    description: req.query.description,
    image: req.query.image,
    user: req.query.user,
    choices: JSON.parse(req.query.choices),
  });
  res.status(200).json(id);
};
export default handler;

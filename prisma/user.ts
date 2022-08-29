// /prisma/user.ts
import prisma from "./prisma";

// READ
export const getAllUsers = async () => {
  const users = await prisma.account.findMany({});
  return users;
};

export const getFeed = async (userId: string | null) => {
  const polls = await prisma.poll.findMany({
    ...(userId && { where: { userId: userId } }),
    ...(!userId && {
      take: 20,
    }),
    include: {
      user: true,
    },
  });
  return polls;
};

export const getUser = async (email: any) => {
  const user = await prisma.account.findUnique({
    where: { email: email },
  });
  return user;
};

export const findPoll = async (id: any) => {
  const user = await prisma.poll.findUnique({
    where: { id: id },
    include: {
      choices: true, // Return all fields
      user: true,
    },
  });
  return user;
};

export const createPoll = async ({
  question,
  description,
  image,
  user,
  choices,
}: any) => {
  const poll = await prisma.poll.create({
    data: {
      question: question,
      description: description,
      image: image,
      user: {
        connect: {
          id: user,
        },
      },
      choices: {
        create: [],
      },
    },
  });

  await prisma.choice.createMany({
    data: choices.map((choice: any) => {
      return {
        name: choice,
        pollId: poll.id,
      };
    }),
  });
  return poll;
};

// CREATE
export const createUser = async (name: string, email: string) => {
  const user = await prisma.account.create({
    data: {
      email: email,
      name: name,
      image: "",
      // polls: [],
    },
  });
  return user;
};

// UPDATE
export const updateUser = async (id: any, updateData: any) => {
  const user = await prisma.account.update({
    where: {
      id,
    },
    data: {
      ...updateData,
    },
  });
  return user;
};

// DELETE
export const deleteUser = async (id: any) => {
  const user = await prisma.account.delete({
    where: {
      id,
    },
  });
  return user;
};

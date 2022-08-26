// /prisma/user.ts
import prisma from "./prisma";

// READ
export const getAllUsers = async () => {
  const users = await prisma.account.findMany({});
  return users;
};

export const getUser = async (id: any) => {
  const user = await prisma.account.findUnique({
    where: { id },
  });
  return user;
};

// CREATE
export const createUser = async (email: any, name: any, birthYear: any) => {
  const user = await prisma.account.create({
    data: {
      email,
      name,
      birthYear,
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
export const deleteUser = async (id) => {
  const user = await prisma.account.delete({
    where: {
      id,
    },
  });
  return user;
};

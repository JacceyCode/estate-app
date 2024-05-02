import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get users!" });
  }
};

export const getUser = async (req, res) => {
  try {
    const tokenId = req.userId;
    const paramsId = req.params.id;

    if (tokenId !== paramsId) return res.status(403).json("Not Authorized!");

    const user = await prisma.user.findUnique({
      where: { id: tokenId },
    });

    const { password, ...rest } = user;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const tokenId = req.userId;
  const paramsId = req.params.id;
  const { password, avatar, ...inputs } = req.body;

  if (tokenId !== paramsId) return res.status(403).json("Not authorized!");

  let updatedPassword = null;
  try {
    if (password) {
      updatedPassword = await bcrypt.hash(password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id: tokenId },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(avatar && { avatar }),
      },
    });

    const { password: userPassword, ...rest } = updatedUser;

    res.status(200).json(rest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const tokenId = req.userId;
    const paramsId = req.params.id;

    if (tokenId !== paramsId) return res.status(403).json("Not authorized!");

    await prisma.user.delete({ where: { id } });

    res.status(200).json({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to delete user!" });
  }
};

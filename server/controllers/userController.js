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

export const savePost = async (req, res) => {
  try {
    const postId = req.body.postId;
    const userId = req.userId;

    const savedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });

    if (savedPost) {
      await prisma.savedPost.delete({
        where: {
          id: savedPost.id,
        },
      });
      res.status(200).json({ message: "Post removed from saved list!" });
    } else {
      await prisma.savedPost.create({
        data: {
          userId: userId,
          postId: postId,
        },
      });
      res.status(200).json({ message: "Post saved!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to save post" });
  }
};

export const profilePosts = async (req, res) => {
  try {
    const userId = req.userId || null;

    const userPosts = await prisma.post.findMany({
      where: { userId },
    });

    const saved = await prisma.savedPost.findMany({
      where: { userId },
      include: {
        post: true,
      },
    });

    const savedPosts = saved.map((item) => item.post);
    res.status(200).json({ userPosts, savedPosts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get profile posts!" });
  }
};

export const getNotificationNumber = async (req, res) => {
  try {
    const userId = req.userId;

    const chatsNumber = await prisma.chat.count({
      where: {
        userIDs: {
          hasSome: [userId],
        },
        NOT: {
          seenBy: {
            hasSome: [userId],
          },
        },
      },
    });

    res.status(200).json(chatsNumber);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get notification counts!" });
  }
};

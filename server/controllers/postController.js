import prisma from "../lib/prisma.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get posts." });
  }
};

export const getPost = async (req, res) => {
  try {
    const id = req.params.id;

    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get post." });
  }
};

export const addPost = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.userId;

    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post." });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json("Coming soon...");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update post." });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;

    const post = await prisma.post.findUnique({ where: { id } });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized." });
    }

    await prisma.post.delete({ where: { id } });

    res.status(200).json({ message: "Post deleted." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete post." });
  }
};

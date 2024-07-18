import prisma from "../lib/prisma.js";

export const getChats = async (req, res) => {
  const userId = req.userId;
  try {
    const chats = await prisma.chat.findMany({
      where: {
        userIDs: {
          hasSome: [userId],
        },
      },
    });

    for (const chat of chats) {
      const receiverId = chat.userIDs[1];
      const senderId = chat.userIDs[0];

      const profile = await prisma.user.findMany({
        where: {
          id: {
            in: [receiverId, senderId],
          },
        },
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      });

      chat.receiver = profile[0];
      chat.sender = profile[1];
    }

    res.status(200).json(chats);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const userId = req.userId;
  try {
    const chat = await prisma.chat.findUnique({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [userId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAT: "asc",
          },
        },
      },
    });

    await prisma.chat.update({
      where: {
        id: req.params.id,
      },
      data: {
        seenBy: {
          push: [userId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const addChat = async (req, res) => {
  const userId = req.userId;
  const { receiverId, imageUrl, propertyId } = req.body;

  console.log("Server console//////////////////////////////");

  console.log(imageUrl, propertyId);

  // Basic validation
  if (!receiverId || !imageUrl || !propertyId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    // const newChat = await prisma.chat.create({
    //   data: {
    //     userIDs: [userId, receiverId],
    //     imageUrl: imageUrl,
    //     propertyId: propertyId,
    //   },
    // });
    // const newChat = await prisma.chat.create({
    //   data: {
    //     users: { connect: [{ id: userId }, { id: receiverId }] },
    //     imageUrl: imageUrl,
    //     propertyId: propertyId,
    //   },
    // });

    // res.status(200).json(newChat);

    // Step 1: Check for existing chat
    const existingChat = await prisma.chat.findFirst({
      where: {
        propertyId: propertyId,
        userIDs: {
          hasEvery: [userId, receiverId], // Ensure both users are part of the chat
        },
      },
    });

    // Step 2: If chat is found, return the chat object
    if (existingChat) {
      return res.status(200).json(existingChat);
    }

    // Step 3: If no chat is found, create a new chat
    const newChat = await prisma.chat.create({
      data: {
        users: { connect: [{ id: userId }, { id: receiverId }] }, // Connect users based on their IDs
        imageUrl: imageUrl,
        propertyId: propertyId,
      },
    });

    res.status(200).json(newChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

export const readChat = async (req, res) => {
  const userId = req.userId;

  try {
    const chat = await prisma.chat.update({
      where: {
        id: req.params.id,
        userIDs: {
          hasSome: [userId],
        },
      },
      data: {
        seenBy: {
          push: [userId],
        },
      },
    });

    res.status(200).json(chat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to read chat!" });
  }
};

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

  // Basic validation
  if (!userId || !receiverId || !imageUrl || !propertyId) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Ensure userId and receiverId are distinct
  // if (userId === receiverId) {
  //   return res
  //     .status(400)
  //     .json({ message: "User cannot chat with themselves!" });
  // }

  try {
    const newChat = await prisma.chat.create({
      data: {
        userIDs: [userId, receiverId],
        imageUrl,
        propertyId,
      },
    });

    res.status(200).json(newChat);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add chat!" });
  }
};

// export const addChat = async (req, res) => {
//   const userId = req.userId;
//   const { receiverId, imageUrl, propertyId } = req.body;

//   // Basic validation
//   if (!userId || !receiverId || !imageUrl || !propertyId) {
//     return res.status(400).json({ message: "All fields are required!" });
//   }

//   // Ensure userId and receiverId are distinct
//   if (userId === receiverId) {
//     return res
//       .status(400)
//       .json({ message: "User cannot chat with themselves!" });
//   }

//   try {
//     const newChat = await prisma.chat.create({
//       data: {
//         userIDs: [userId, receiverId], // Connect users to the chat
//         imageUrl,
//         propertyId,
//       },
//       include: {
//         users: true, // Include users in the response
//       },
//     });

//     res.status(200).json(newChat);
//   } catch (error) {
//     console.error("Error creating chat:", error);
//     res.status(500).json({ message: "Failed to add chat!" });
//   }
// };

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

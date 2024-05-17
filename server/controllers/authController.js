import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //   HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 12);

    // CREATE USER AND SAVE IN DATABASE
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user!" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //    CHECK IF USER EXISTS
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials!" });

    // CHECK IF PASSWORD IS CORRECT

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials!" });

    // GENERATE COOKIE TOKEN AND SEND TO USER

    // ----- TO GENERATE TOKEN SECRET KEY -----
    // Go to the terminal and type "openssl rand -base64 32"

    const tokenAge = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      { id: user.id, isAdmin: true },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: tokenAge,
      }
    );

    // NOTE: Setting cookie in header if cookie parser is not installed...
    // res
    //   .setHeader("Set-Cookie", "Bearer=" + "cookieValue")
    //   .send("Login Router works");

    // NOTE: Setting cookie in header if cookie parser is installed...

    const { password: userPassword, ...userInfo } = user;

    const cookieOptions = {
      expiresIn: tokenAge,
      httpOnly: true,
      // sameSite: "None",
    };

    if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

    res.cookie("token", token, cookieOptions).status(200).json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login user!" });
  }
};

export const logout = (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json({ message: "Logout Successful." });
};

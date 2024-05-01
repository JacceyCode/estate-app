import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
  console.log("Server is running...");
});
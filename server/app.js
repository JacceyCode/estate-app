import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute.js";
import authRoute from "./routes/authRoute.js";
import testRoute from "./routes/testRoute.js";
import userRoute from "./routes/userRoute.js";

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
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);

app.listen(8800, () => {
  console.log("Server is running...");
});

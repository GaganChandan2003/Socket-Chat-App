import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connection from "../backend/config/db.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

server.listen(process.env.PORT || 8000, async () => {
  try {
    await connection;
    console.log("Connected");
  } catch (err) {
    console.log(err.message);
    console.log("Disconnected");
  }
  console.log(`Listening on port http://localhost:${process.env.PORT || 8000}`);
});

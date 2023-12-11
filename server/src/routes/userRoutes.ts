import { handleLogin, handleNewUser, handleRefreshToken } from "../controllers/schoolController";
import express from "express";

export const userRouter = express.Router();

userRouter.post("/login", handleLogin);
userRouter.post("/register", handleNewUser);
userRouter.post("/refresh", handleRefreshToken);

// module.exports = userRouter;

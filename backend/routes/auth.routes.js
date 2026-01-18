import express from "express";
import { signUp, signIn, logout } from "../controllers/auth.controller.js";

const authRouter = express.Router();

// Auth routes
authRouter.post("/signup", signUp);
authRouter.post("/signin", signIn);
authRouter.post("/logout", logout);

export default authRouter;

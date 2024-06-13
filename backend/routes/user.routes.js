import express from "express";
import { authentication } from "../middleware/authentication.js";
import { getUsers } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authentication, getUsers);

export default router;

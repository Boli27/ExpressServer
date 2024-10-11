import Router from "express"
import { createForum } from "../controllers/forumController.js"

const router = Router();

router.post("/create". createForum)
import { Router } from "express";
import { createUser, verifyUser } from "../controllers/userController.js";
import { existEmail } from "../middlewares/existEmail.js";
import {existToken} from '../middlewares/existToken.js'
const router = Router();

//user routes
router.post("/",[existEmail], createUser)


//verificar cuenta
router.get("/verify/:token", [existToken], verifyUser)

export default router


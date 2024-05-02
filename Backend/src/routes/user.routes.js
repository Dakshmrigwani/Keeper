import { Router } from "express";
// import { verifyJWT } from "../middlewares/auth.middleware.js"; 
import { login, registerUser } from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login" , login)

export default router;
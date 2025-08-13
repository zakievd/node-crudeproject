import { Router } from "express";
import AuthController from "../../controllers/auth.controller";
const { loginUser } = AuthController;

const router = Router();

router.post("/login", loginUser);

export default router;

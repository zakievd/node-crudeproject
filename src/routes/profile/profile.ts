import { Router } from "express";

import profileController from "../../controllers/profile.controller";
import { authMiddleware } from "../../middlewares/auth.middlewares";
const { updateUser,deleteUser} = profileController;

const router = Router();

router.put("/profile", authMiddleware,updateUser);
router.delete("/profile",authMiddleware,deleteUser)

export default router;

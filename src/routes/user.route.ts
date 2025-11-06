import express from "express";
import { createUser, changePassword } from "../controllers/user.controller";
import { validate } from "../middleware/validate";
import { createUserSchema, changePasswordSchema } from "../validations/user.validation";
const router = express.Router();

router.post("/create-user", validate(createUserSchema), createUser);
router.post("/change-password/:res_user_id", validate(changePasswordSchema), changePassword);

export default router;

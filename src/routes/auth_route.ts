import express from "express";
import { loginUser } from "../controllers/auth_controller";
import { validate } from "../middleware/validate";
import { loginSchema } from "../validations/auth.validator";
const router = express.Router();

router.post("/login-user", validate(loginSchema), loginUser);

export default router;

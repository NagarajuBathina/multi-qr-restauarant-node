import express from "express";
import { createUser } from "../controllers/user_controller";
import { validate } from "../middleware/validate";
import { createUserSchema } from "../validations/user.validation";
const router = express.Router();

router.post("/create-user", validate(createUserSchema), createUser);

export default router;

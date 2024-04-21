import { Router } from "express";
import { body } from "express-validator";
import {
  authController,
  authCheckController,
  getLoginUserController,
  logoutController,
  updateUserController,
  deleteUserController,
} from "../controller/user/user_controller";
import { validate } from "../pkg/validate";
import { auth } from "./middlewares/auth";

const userRouter = Router();

userRouter.post(
  "/auth",
  validate([body("id_token").isString().isLength({ min: 1 }).withMessage("必須項目です。")]),
  authController,
);
userRouter.get("/authenticated", authCheckController);
userRouter.post("/logout", auth, logoutController);
userRouter.get("/me", auth, getLoginUserController);
userRouter.patch(
  "/me",
  auth,
  validate([body("name").isString().isLength({ min: 1 }).withMessage("必須項目です。")]),
  updateUserController,
);
userRouter.delete("/me", auth, deleteUserController);

export { userRouter };

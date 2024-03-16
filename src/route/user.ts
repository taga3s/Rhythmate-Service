import { Router } from "express";
import {
  authController,
  getLoginUserController,
  loginController,
  logoutController,
  signupController,
  updateUserController,
} from "../controller/user/user_controller";
import { body } from "express-validator";
import { validate } from "../pkg/validate";
import { auth } from "./middlewares/auth";

const userRouter = Router();

userRouter.post(
  "/auth",
  validate([body("id_token").isString().isLength({ min: 1 }).withMessage("必須項目です。")]),
  authController,
);
userRouter.post(
  "/signup",
  validate([
    body("name").isString().isLength({ min: 1 }).withMessage("必須項目です。"),
    body("email").isEmail().withMessage("必須項目です。"),
    body("password").isLength({ min: 8 }).withMessage("パスワードは8文字以上必須です。"),
    body("password_confirmation").isLength({ min: 8 }).withMessage("パスワードは8文字以上必須です。"),
  ]),
  signupController,
);
userRouter.post(
  "/login",
  validate([
    body("email").isEmail().withMessage("必須項目です。"),
    body("password").isLength({ min: 8 }).withMessage("パスワードは8文字以上必須です。"),
  ]),
  loginController,
);
userRouter.post("/logout", auth, logoutController);
userRouter.get("/me", auth, getLoginUserController);
userRouter.patch(
  "/me",
  auth,
  validate([body("name").isString().isLength({ min: 1 }).withMessage("必須項目です。")]),
  updateUserController,
);

export { userRouter };

import { Request, Response } from "express";
import { loginRequest, signupRequest, updateUserRequest } from "./request";
import { getUserResponse, signupResponse } from "./response";
import { signupService } from "../../service/user/signup_service";
import { loginService } from "../../service/user/login_service";
import { generateToken } from "../../utils/jwt";

// サインアップ
export const signupController = async (req: Request<{}, {}, signupRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await signupService(inputDTO);
    const response: signupResponse = { status: "ok" }
    return res.status(200).json(response)
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ status: "error", message: err.message })
    }
    return res.status(500).json({ status: "error", message: "Internal server error." })
  }
}

// ログイン
export const loginController = async (req: Request<{}, {}, loginRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await loginService(inputDTO)

    // jwtを生成し、クッキーにセットする。
    const jwt = generateToken(outputDTO.id, outputDTO.email)
    res.cookie('access_token', jwt)

    const response: signupResponse = { status: "ok" }

    return res.status(200).json(response)
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message })
    }
    return res.status(500).json({ status: "error", message: "Internal server error." })
  }
}

// ログアウト
export const logoutController = async (req: Request, res: Response) => {
  res.cookie('access_token', '')
  res.status(204)
}

// ユーザー取得（条件付き）
export const getUserController = async (req: Request, res: Response) => {
  const response: getUserResponse = {
    status: "ok",
    username: "",
    email: "",
    level: 1
  }
  res.status(200).json(response)
}

//　ユーザー情報更新（条件付き）
export const updateUserController = async (req: Request<{}, {}, updateUserRequest>, res: Response) => {
  res.status(200)
}
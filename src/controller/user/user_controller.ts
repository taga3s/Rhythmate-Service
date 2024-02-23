import { Request, Response } from "express";
import { LoginRequest, SignupRequest, UpdateLoginUserRequest } from "./request";
import { GetLoginUserResponse, LoginResponse, SignupResponse } from "./response";
import { signupService } from "../../service/user/signup_service";
import { loginService } from "../../service/user/login_service";
import { generateToken, verifyToken } from "../../utils/jwt";
import { CustomError } from "../../pkg/customError";
import { JwtPayload } from "jsonwebtoken";
import { getLoginUserService } from "../../service/user/get_login_user_service";
import { updateLoginUserService } from "../../service/user/update_login_user_service";

// サインアップ
export const signupController = async (req: Request<{}, {}, SignupRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await signupService(inputDTO);
    const response: SignupResponse = { status: "ok" }
    return res.status(200).json(response)
  } catch (err) {

    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message })
    }
    return res.status(500).json({ status: "error", message: "サーバーエラー" })
  }
}

// ログイン
export const loginController = async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await loginService(inputDTO)

    // jwtを生成し、クッキーにセットする。
    const jwt = generateToken(outputDTO.id, outputDTO.email)
    res.cookie('access_token', jwt)

    const response: LoginResponse = { status: "ok" }

    return res.status(200).json(response)
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message })
    }
    return res.status(500).json({ status: "error", message: "サーバーエラー" })
  }
}

// ログアウト
export const logoutController = async (req: Request, res: Response) => {
  res.cookie('access_token', '')
  res.sendStatus(204)
}

// ユーザー取得（条件付き）
export const getLoginUserController = async (req: Request, res: Response) => {
  const decoded = verifyToken(req.cookies.access_token) as JwtPayload
  const inputDTO = { user_id: decoded.user_id }

  try {
    const outputDTO = await getLoginUserService(inputDTO)
    const response: GetLoginUserResponse = {
      status: "ok",
      name: outputDTO.name,
      email: outputDTO.email,
      level: outputDTO.level
    }
    res.status(200).json(response)
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message })
    }
    return res.status(500).json({ status: "error", message: "サーバーエラー" })
  }
}

//　ユーザー情報更新（条件付き）
export const updateUserController = async (req: Request<{}, {}, UpdateLoginUserRequest>, res: Response) => {
  const decoded = verifyToken(req.cookies.access_token) as JwtPayload
  const inputDTO = {
    user_id: decoded.user_id,
    ...req.body
  }

  try {
    const outputDTO = await updateLoginUserService(inputDTO)
    const response: GetLoginUserResponse = {
      status: "ok",
      name: outputDTO.name,
      email: outputDTO.email,
      level: outputDTO.level
    }
    return res.status(200).json(response)
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message })
    }
    return res.status(500).json({ status: "error", message: "サーバーエラー" })
  }
}
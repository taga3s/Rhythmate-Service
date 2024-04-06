import { Request, Response } from "express";
import { generateToken, getUserIdFromToken, getUserIsAuthenticated } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { authService } from "../../service/user/auth_service";
import { getLoginUserService } from "../../service/user/get_login_user_service";
import { updateLoginUserService } from "../../service/user/update_login_user_service";
import { AuthRequest, UpdateLoginUserRequest } from "./request";
import { AuthResponse, GetLoginUserResponse } from "./response";
import { logger } from "../../pkg/logger";

// 認証
export const authController = async (req: Request<{}, {}, AuthRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await authService(inputDTO);

    // jwtを生成し、セッションにセットする
    const jwt = generateToken(outputDTO.id, outputDTO.email);
    req.session.accessToken = jwt;

    const response: AuthResponse = { status: "ok" };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// 認可状態確認
export const authenticationController = async (req: Request, res: Response) => {
  const isAuthenticated = getUserIsAuthenticated(req.session.accessToken || "");
  res.status(200).json({ status: "ok", isAuthenticated: isAuthenticated });
};

// ログアウト
export const logoutController = async (req: Request, res: Response) => {
  req.session.destroy((err: any) => {
    logger.error(err);
  });
  res.sendStatus(204);
};

// ユーザー取得（条件付き）
export const getLoginUserController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.session.accessToken || "");
  const inputDTO = { userId: userId };

  try {
    const outputDTO = await getLoginUserService(inputDTO);
    const response: GetLoginUserResponse = {
      status: "ok",
      name: outputDTO.name,
      email: outputDTO.email,
      exp: outputDTO.exp,
      level: outputDTO.level,
    };
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ユーザー情報更新（条件付き）
export const updateUserController = async (req: Request<{}, {}, UpdateLoginUserRequest>, res: Response) => {
  const userId = getUserIdFromToken(req.session.accessToken || "");
  const inputDTO = {
    userId: userId,
    ...req.body,
  };

  try {
    const outputDTO = await updateLoginUserService(inputDTO);
    const response: GetLoginUserResponse = {
      status: "ok",
      name: outputDTO.name,
      email: outputDTO.email,
      exp: outputDTO.exp,
      level: outputDTO.level,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

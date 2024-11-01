import { Request, Response } from "express";
import { generateToken, getUserIdFromToken } from "../../pkg/jwt/jwt";
import { HttpError } from "../../utils/httpError";
import { AuthRequest, UpdateLoginUserRequest } from "./request";
import {
  AuthResponse,
  GetLoginUserResponse,
  UpdateLoginUserResponse,
  DeleteUserResponse,
  toUserBaseResponse,
} from "./response";
import { authService, deleteUserService, getLoginUserService, updateLoginUserService } from "../../service/user";

// 認証
export const authController = async (req: Request<{}, {}, AuthRequest>, res: Response) => {
  const inputDTO = req.body;

  try {
    const outputDTO = await authService(inputDTO);
    // jwtを生成し、クッキーにセットする
    const jwt = generateToken(outputDTO.id, outputDTO.email);
    res.cookie("access_token", jwt, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    const response: AuthResponse = { status: "ok" };
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ status: "error", message: err.message });
      return;
    }
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ログアウト
export const logoutController = async (req: Request, res: Response) => {
  res.cookie("access_token", "");
  res.sendStatus(204);
};

// ユーザー取得（条件付き）
export const getLoginUserController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { userId: userId };

  try {
    const outputDTO = await getLoginUserService(inputDTO);
    const response: GetLoginUserResponse = {
      status: "ok",
      ...toUserBaseResponse(outputDTO),
    };
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ status: "error", message: err.message });
      return;
    }
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ユーザー情報更新（条件付き）
export const updateUserController = async (req: Request<{}, {}, UpdateLoginUserRequest>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = {
    userId: userId,
    name: req.body.name,
    imageSrc: req.body.image_src,
  };

  try {
    const outputDTO = await updateLoginUserService(inputDTO);
    const response: UpdateLoginUserResponse = {
      status: "ok",
      ...toUserBaseResponse(outputDTO),
    };
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ status: "error", message: err.message });
      return;
    }
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ユーザー削除
export const deleteUserController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);

  try {
    await deleteUserService({ userId: userId });
    const response: DeleteUserResponse = {
      status: "ok",
    };
    res.cookie("access_token", "");
    res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      res.status(err.statusCode).json({ status: "error", message: err.message });
      return;
    }
    res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

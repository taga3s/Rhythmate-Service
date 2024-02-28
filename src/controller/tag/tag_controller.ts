import { Request, Response } from "express";
import { CreateTagRequest, UpdateTagRequest } from "./request";
import { CreateTagResponse, UpdateTagResponse, GetTagResponse, DeleteTagResponse } from "./response";
import { verifyToken } from "../../core/jwt";
import { createTagService } from "../../service/tag/create_tag_service";
import { deleteTagService } from "../../service/tag/delete_tag_service";
import { getTagService } from "../../service/tag/get_tag_service";
import { updateTagService } from "../../service/tag/update_tag_service";
import { CustomError } from "../../pkg/customError";
import { JwtPayload } from "jsonwebtoken";
import { Tag } from "../../model/tag/types";

// タグの作成
export const createTagController = async (req: Request<{}, {}, CreateTagRequest>, res: Response) => {
  const decoded = verifyToken(req.cookies.access_token) as JwtPayload;
  const inputDTO = {
    userId: decoded.userId,
    name: req.body.name,
  };
  try {
    const outputDTO = await createTagService(inputDTO);
    const response: CreateTagResponse = {
      status: "ok",
      id: outputDTO.id,
      name: outputDTO.name,
      created_at: outputDTO.createdAt,
      updated_at: outputDTO.updatedAt,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// タグの削除
export const deleteTagController = async (req: Request<{ id: string }>, res: Response) => {
  const inputDTO = { id: req.params.id };
  try {
    const outputDTO = await deleteTagService(inputDTO);
    const response: DeleteTagResponse = { status: "ok" };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// タグの更新
export const updateTagController = async (req: Request<{ id: string }, {}, UpdateTagRequest>, res: Response) => {
  const inputDTO = {
    id: req.params.id,
    name: req.body.name,
  };

  try {
    const outputDTO = await updateTagService(inputDTO);
    const response: UpdateTagResponse = {
      status: "ok",
      id: outputDTO.id,
      name: outputDTO.name,
      created_at: outputDTO.createdAt,
      updated_at: outputDTO.updatedAt,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// ユーザーの所持するすべてのタグを取得
export const getTagController = async (req: Request, res: Response) => {
  const decoded = verifyToken(req.cookies.access_token) as JwtPayload;
  const inputDTO = { userId: decoded.userId };
  try {
    const outputDTO = await getTagService(inputDTO);
    const response: GetTagResponse = {
      status: "ok",
      tags: outputDTO.tags?.map((tag: Tag) => {
        return {
          id: tag.id,
          name: tag.name,
          created_at: tag.createdAt,
          updated_at: tag.updatedAt,
        };
      }),
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

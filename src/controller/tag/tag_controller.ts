import { Request, Response } from "express";
import { CreateTagRequest, UpdateTagRequest } from "./request";
import { CreateTagResponse, UpdateTagResponse, DeleteTagResponse, ListTagsResponse } from "./response";
import { getUserIdFromToken } from "../../core/jwt";
import { HttpError } from "../../pkg/httpError";
import { Tag } from "../../model/tag/types";
import { createTagService, deleteTagService, listTagsService, updateTagService } from "../../service/tag";

// ユーザーの所持するすべてのタグを取得
export const listTagsController = async (req: Request, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = { userId: userId };
  try {
    const outputDTO = await listTagsService(inputDTO);
    const response: ListTagsResponse = {
      status: "ok",
      tags: outputDTO.tags?.map((tag: Tag) => {
        return {
          id: tag.id,
          name: tag.name,
          color: tag.color,
          created_at: tag.createdAt,
          updated_at: tag.updatedAt,
        };
      }),
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

// タグの作成
export const createTagController = async (req: Request<{}, {}, CreateTagRequest>, res: Response) => {
  const userId = getUserIdFromToken(req.cookies.access_token);
  const inputDTO = {
    name: req.body.name,
    color: req.body.color,
    userId: userId,
  };
  try {
    const outputDTO = await createTagService(inputDTO);
    const response: CreateTagResponse = {
      status: "ok",
      id: outputDTO.id,
      name: outputDTO.name,
      color: outputDTO.color,
      created_at: outputDTO.createdAt,
      updated_at: outputDTO.updatedAt,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
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
    if (err instanceof HttpError) {
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
    color: req.body.color,
  };

  try {
    const outputDTO = await updateTagService(inputDTO);
    const response: UpdateTagResponse = {
      status: "ok",
      id: outputDTO.id,
      name: outputDTO.name,
      color: outputDTO.color,
      created_at: outputDTO.createdAt,
      updated_at: outputDTO.updatedAt,
    };
    return res.status(200).json(response);
  } catch (err) {
    if (err instanceof HttpError) {
      return res.status(err.statusCode).json({ status: "error", message: err.message });
    }
    return res.status(500).json({ status: "error", message: "Internal server error." });
  }
};

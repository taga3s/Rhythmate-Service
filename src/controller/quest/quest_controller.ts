import { Request, Response } from "express";
import { CreateQuestRequest, UpdateQuestRequest } from "../quest/request";
import { CreateQuestResponse, DeleteQuestResponse, UpdateQuestResponse, GetQuestResponse } from "../quest/response";
import { createQuestService } from "../../service/quest/create_quest_service";
import { deleteQuestService } from "../../service/quest/delete_quest_service";
import { updateQuestService } from "../../service/quest/update_quest_service";
import { getQuestService } from "../../service/quest/get_quest_service";
import { CustomError } from "../../pkg/customError";

// クエストの作成
export const createQuestController = async (req: Request, res: Response) => {
    const inputDTO = req.body;

    try {
        const outputDTO = await createQuestService(inputDTO);
        const response: CreateQuestResponse = { status: "ok" }
        return res.status(200).json(response)
    } catch (err) {

        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ status: "error", message: err.message })
        }
        return res.status(500).json({ status: "error", message: "Internal server error." })
    }
}

// クエストの削除
export const deleteQuestController = async (req: Request, res: Response) => {
    const inputDTO = { id: req.params.id };
    try {
        const outputDTO = await deleteQuestService(inputDTO);
        const response: DeleteQuestResponse = { status: "ok" }
        return res.status(200).json(response)
    } catch (err) {

        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ status: "error", message: err.message })
        }
        return res.status(500).json({ status: "error", message: "Internal server error." })
    }
}

// クエストの更新
export const updateQuestController = async (req: Request, res: Response) => {
    const inputDTO = { id: req.params.id, ...req.body };

    try {
        const outputDTO = await updateQuestService(inputDTO);
        const response: UpdateQuestResponse = { status: "ok" }
        return res.status(200).json(response)
    } catch (err) {

        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ status: "error", message: err.message })
        }
        return res.status(500).json({ status: "error", message: "Internal server error." })
    }
}

// ユーザーの所持するすべてのクエストを取得
export const getQuestController = async (req: Request, res: Response) => {

    const inputDTO = { userId: req.params.userId };
    try {

        const outputDTO = await getQuestService(inputDTO);
        const response: GetQuestResponse = {
            status: "ok",
            quests: outputDTO.quests
        }
        return res.status(200).json(response)
    } catch (err) {
        if (err instanceof CustomError) {
            return res.status(err.statusCode).json({ status: "error", message: err.message })
        }
        return res.status(500).json({ status: "error", message: "Internal server error." })
    }
}
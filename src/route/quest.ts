import { Router } from "express";
import { createQuestController, updateQuestController, deleteQuestController, getQuestController } from "../controller/quest/quest_controller";
import { body } from "express-validator";
import { validate } from "../pkg/validate";
import { auth } from "./middlewares/auth";

const questRouter = Router();

questRouter.post(
  "/",
  auth,
  validate([
    body('title').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
    body('description').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
    body('starts_at').isString().withMessage('必須項目です。'),
    body('minutes').isNumeric().withMessage('必須項目です。'),
    body('difficulty').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
    body('dates').isArray().isLength({ min: 1 }).withMessage('１日以上選択してください。'),
  ]),
  createQuestController
);
questRouter.patch(
  "/:id",
  auth,
  updateQuestController
);
questRouter.delete(
  "/:id",
  auth,
  deleteQuestController
);
questRouter.get(
  "/",
  auth,
  getQuestController
);

export { questRouter }
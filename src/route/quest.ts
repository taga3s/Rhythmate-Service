import { Router } from "express";
import { createQuestController, updateQuestController, deleteQuestController, getQuestController } from "../controller/quest/quest_controller";
import { body } from "express-validator";
import { validate } from "../pkg/validate";

const questRouter = Router();

questRouter.post(
  "/",
  validate([
    body('title').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
    body('description').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
    body('startsAt').isString().withMessage('必須項目です。'),
    body('minutes').isNumeric().withMessage('必須項目です。'),
    body('difficulty').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
    body('dates').isArray().isLength({ min : 1}).withMessage('１日以上選択してください。'),
  ]),
  createQuestController
);
questRouter.patch(
  "/",
  validate([
    body('id').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
  ]),
  updateQuestController
);
questRouter.delete(
  "/",
  validate([
    body('id').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
  ]),
  deleteQuestController
);
questRouter.get(
  "/",
  validate([
    body('user_id').isString().isLength({ min: 1 }).withMessage('必須項目です。'),
  ]),
  getQuestController
);

export { questRouter }
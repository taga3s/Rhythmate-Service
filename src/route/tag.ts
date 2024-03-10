import { Router } from "express";
import {
  createTagController,
  updateTagController,
  deleteTagController,
  listTagsController,
} from "../controller/tag/tag_controller";
import { body } from "express-validator";
import { validate } from "../pkg/validate";
import { auth } from "./middlewares/auth";

const tagRouter = Router();

tagRouter.get("/", auth, listTagsController);
tagRouter.post(
  "/",
  auth,
  validate([body("name").isString().isLength({ min: 1 }).withMessage("必須項目です。")]),
  createTagController,
);
tagRouter.patch("/:id", auth, updateTagController);
tagRouter.delete("/:id", auth, deleteTagController);
export { tagRouter };

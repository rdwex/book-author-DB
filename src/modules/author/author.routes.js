import { Router } from "express";
import * as authorController from "./author.controller.js";

const router = Router();

router.post("/add", authorController.addAuthor);
router.put("/update/:_id", authorController.updateAuthor);
router.delete("/delete/:_id", authorController.deleteAuthor);
router.get("/list", authorController.getAuthor);
router.get("/:_id", authorController.getOneAuthor);

export default router;

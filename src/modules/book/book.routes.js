import { Router } from "express";
import * as bookController from "./book.controller.js";

const router = Router();

router.post("/add", bookController.createBook);
router.get("/list", bookController.getBook);
router.get("/:_id", bookController.getOneBook);
router.get("/get", bookController.getBookLimit);
router.get("/", bookController.getBookFilter);
router.put("/update/:_id", bookController.updateBook);
router.delete("/delete/:_id", bookController.deleteBook);

//
export default router;


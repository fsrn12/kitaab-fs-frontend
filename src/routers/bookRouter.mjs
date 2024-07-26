import { Router } from "express";
import {
  deleteBook,
  getAddBook,
  getBooks,
  getEditBook,
  postBook,
  updateBook,
} from "../controller/bookController.mjs";

// getBookByID,
// router.get("/:bookId", getBookByID);
const router = Router();

router.route("/").get(getBooks).post(postBook);

router.get("/addBook", getAddBook);
router.get("/editBook/:bookId", getEditBook);
router.post("/update", updateBook);
router.get("/deleteBook/:bookId", deleteBook);

export default router;

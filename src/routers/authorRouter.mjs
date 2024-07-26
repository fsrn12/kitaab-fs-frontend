import { Router } from "express";
import {
  deleteAuthor,
  getAddAuthor,
  getAuthors,
  getEditAuthor,
  postAuthor,
  updateAuthor,
} from "../controller/authorController.mjs";

const router = Router();

router.route("/").get(getAuthors).post(postAuthor);

router.get("/addAuthor", getAddAuthor);
router.get("/editAuthor/:authorId", getEditAuthor);
router.post("/update", updateAuthor);
router.get("/deleteAuthor/:authorId", deleteAuthor);

export default router;

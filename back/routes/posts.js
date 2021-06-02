import express from "express";
import {
  getPosts,
  createPosts,
  updatePost,
  deletePost,
  likePost,
  getPostsBySearch,
} from "../controllers/posts.js";
import auth from "../middleware/auth.js";
const router = express.Router();

const test = () => {
  console.log("test");
};
router.get("/", getPosts);
router.post("/", auth, createPosts);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.get("/search", getPostsBySearch);
export default router;

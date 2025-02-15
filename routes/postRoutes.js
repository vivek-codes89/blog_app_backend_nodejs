const express = require("express");
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Protected routes (require authentication)
router.post("/", authMiddleware, createPost); // Only authenticated users can create posts
router.put("/:id", authMiddleware, updatePost); // Only authenticated users can update posts
router.delete("/:id", authMiddleware, deletePost); // Only authenticated users can delete posts

module.exports = router;

const express = require("express");
const {
	getAllAuthors,
	getAuthorById,
	createAuthor,
	updateAuthor,
	deleteAuthor,
} = require("../controllers/authorController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Routes GET publiques
router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);

// Routes protégées par JWT
router.post("/", protect, createAuthor);
router.put("/:id", protect, updateAuthor);
router.delete("/:id", protect, deleteAuthor);

module.exports = router;

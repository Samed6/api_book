const express = require("express");
const {
	getAllBooks,
	getBookById,
	createBook,
	updateBook,
	deleteBook,
} = require("../controllers/bookController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Routes GET publiques
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Routes protégées par JWT
router.post("/", protect, createBook);
router.put("/:id", protect, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;

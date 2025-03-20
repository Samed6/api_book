const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Route d'inscription
router.post("/register", register);

// Route de connexion
router.post("/login", login);

// Route pour récupérer les informations de l'utilisateur connecté
router.get("/me", protect, getMe);

module.exports = router;

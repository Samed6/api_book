// Importation des modules nécessaires
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Importation de la fonction de connexion à MongoDB
const connectDB = require("./config/db");

// Création de l'application Express
const app = express();

// Configuration du port
const PORT = process.env.PORT || 3000;

// Connexion à MongoDB
connectDB();

// Middleware pour parser le JSON
app.use(express.json());

// Activation de CORS pour permettre les requêtes cross-origin
app.use(cors());

// Importation des routes
const bookRoutes = require("./routes/bookRoutes");
const authorRoutes = require("./routes/authorRoutes");
const authRoutes = require("./routes/authRoutes");

// Utilisation des routes
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api", authRoutes);

// Route de base pour tester l'API
app.get("/", (req, res) => {
	res.json({ message: "Bienvenue sur l'API de gestion de bibliothèque" });
});

// Middleware pour gérer les routes non trouvées
app.use((req, res) => {
	res.status(404).json({ message: "Route non trouvée" });
});

// Démarrage du serveur
app.listen(PORT, () => {
	console.log(`Serveur démarré sur le port ${PORT}`);
});

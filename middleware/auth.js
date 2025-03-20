const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware pour protéger les routes nécessitant une authentification
const protect = async (req, res, next) => {
	try {
		let token;

		// Log pour déboguer les headers
		console.log("Headers d'authentification:", req.headers.authorization);

		// Vérification de la présence du token dans les headers
		if (
			req.headers.authorization &&
			req.headers.authorization.startsWith("Bearer")
		) {
			// Extraction du token (format: "Bearer TOKEN") en gérant les espaces multiples
			token = req.headers.authorization.replace("Bearer", "").trim();
			console.log(
				"Token extrait avec nouvelle méthode:",
				token ? token.substring(0, 20) + "..." : "aucun"
			);
		}

		// Si aucun token n'est fourni
		if (!token) {
			console.log("Aucun token fourni dans la requête");
			return res.status(401).json({
				success: false,
				message: "Non autorisé, veuillez vous connecter",
			});
		}

		try {
			// Vérification et décodage du token
			console.log(
				"Tentative de vérification du token avec le secret:",
				process.env.JWT_SECRET ? "Secret défini" : "Secret non défini"
			);
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log("Token décodé, ID utilisateur:", decoded.id);

			// Récupération de l'utilisateur depuis la base de données
			const currentUser = await User.findById(decoded.id);

			// Vérification de l'existence de l'utilisateur
			if (!currentUser) {
				console.log("Aucun utilisateur trouvé avec l'ID:", decoded.id);
				return res.status(401).json({
					success: false,
					message: "L'utilisateur correspondant à ce token n'existe plus",
				});
			}

			console.log("Authentification réussie pour:", currentUser.username);
			// Ajout de l'utilisateur à l'objet req pour utilisation ultérieure
			req.user = currentUser;
			next();
		} catch (error) {
			// Gestion des erreurs de vérification du token
			console.log("Erreur de vérification du token:", error.message);
			return res.status(401).json({
				success: false,
				message: "Token invalide ou expiré",
			});
		}
	} catch (error) {
		// Gestion des erreurs générales
		console.error("Erreur serveur lors de l'authentification:", error);
		res.status(500).json({
			success: false,
			message: "Erreur serveur lors de l'authentification",
		});
	}
};

module.exports = { protect };

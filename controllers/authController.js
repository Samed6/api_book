const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Fonction pour générer un token JWT
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

// Inscription d'un nouvel utilisateur
exports.register = async (req, res) => {
	try {
		// Extraction des données du corps de la requête
		const { username, email, password } = req.body;

		// Vérification des champs obligatoires
		if (!username || !email || !password) {
			return res.status(400).json({
				success: false,
				message:
					"Veuillez fournir un nom d'utilisateur, un email et un mot de passe",
			});
		}

		// Vérification si l'utilisateur existe déjà
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "Un utilisateur avec cet email existe déjà",
			});
		}

		// Création d'un nouvel utilisateur
		const user = await User.create({
			username,
			email,
			password,
		});

		// Génération du token JWT
		const token = generateToken(user._id);

		// Réponse avec le token
		res.status(201).json({
			success: true,
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de l'inscription",
			error: error.message,
		});
	}
};

// Connexion d'un utilisateur existant
exports.login = async (req, res) => {
	try {
		// Extraction des données du corps de la requête
		const { email, password } = req.body;

		// Vérification des champs obligatoires
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Veuillez fournir un email et un mot de passe",
			});
		}

		// Recherche de l'utilisateur avec son email et inclusion du mot de passe
		const user = await User.findOne({ email }).select("+password");

		// Vérification de l'existence de l'utilisateur
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Email ou mot de passe incorrect",
			});
		}

		// Vérification du mot de passe
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Email ou mot de passe incorrect",
			});
		}

		// Génération du token JWT
		const token = generateToken(user._id);

		// Réponse avec le token
		res.status(200).json({
			success: true,
			token,
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la connexion",
			error: error.message,
		});
	}
};

// Récupération des informations de l'utilisateur connecté
exports.getMe = async (req, res) => {
	try {
		// L'utilisateur est déjà disponible grâce au middleware d'authentification
		res.status(200).json({
			success: true,
			user: {
				id: req.user._id,
				username: req.user.username,
				email: req.user.email,
				createdAt: req.user.createdAt,
			},
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la récupération des informations",
			error: error.message,
		});
	}
};

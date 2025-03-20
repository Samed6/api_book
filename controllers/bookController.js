const Book = require("../models/Book");
const Author = require("../models/Author");

// Récupérer tous les livres
exports.getAllBooks = async (req, res) => {
	try {
		// Construction de la requête de base
		let query = Book.find();

		// Filtrage par auteur si spécifié
		if (req.query.author) {
			query = query.find({ author: req.query.author });
		}

		// Filtrage par genre si spécifié
		if (req.query.genre) {
			query = query.find({ genre: req.query.genre });
		}

		// Filtrage par année de publication si spécifié
		if (req.query.year) {
			query = query.find({ publishedYear: req.query.year });
		}

		// Exécution de la requête
		const books = await query;

		// Réponse avec la liste des livres
		res.status(200).json({
			success: true,
			count: books.length,
			data: books,
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la récupération des livres",
			error: error.message,
		});
	}
};

// Récupérer un livre par son ID
exports.getBookById = async (req, res) => {
	try {
		// Récupération du livre avec l'ID fourni
		const book = await Book.findById(req.params.id);

		// Vérification de l'existence du livre
		if (!book) {
			return res.status(404).json({
				success: false,
				message: "Livre non trouvé",
			});
		}

		// Réponse avec le livre
		res.status(200).json({
			success: true,
			data: book,
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la récupération du livre",
			error: error.message,
		});
	}
};

// Créer un nouveau livre
exports.createBook = async (req, res) => {
	try {
		// Vérification de l'existence de l'auteur
		const author = await Author.findById(req.body.author);
		if (!author) {
			return res.status(404).json({
				success: false,
				message: "Auteur non trouvé",
			});
		}

		// Création d'un nouveau livre
		const book = await Book.create(req.body);

		// Réponse avec le nouveau livre
		res.status(201).json({
			success: true,
			data: book,
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la création du livre",
			error: error.message,
		});
	}
};

// Mettre à jour un livre
exports.updateBook = async (req, res) => {
	try {
		// Si l'auteur est modifié, vérifier son existence
		if (req.body.author) {
			const author = await Author.findById(req.body.author);
			if (!author) {
				return res.status(404).json({
					success: false,
					message: "Auteur non trouvé",
				});
			}
		}

		// Mise à jour du livre avec l'ID fourni
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Retourner le document mis à jour
			runValidators: true, // Exécuter les validateurs Mongoose
		});

		// Vérification de l'existence du livre
		if (!book) {
			return res.status(404).json({
				success: false,
				message: "Livre non trouvé",
			});
		}

		// Réponse avec le livre mis à jour
		res.status(200).json({
			success: true,
			data: book,
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la mise à jour du livre",
			error: error.message,
		});
	}
};

// Supprimer un livre
exports.deleteBook = async (req, res) => {
	try {
		// Suppression du livre avec l'ID fourni
		const book = await Book.findByIdAndDelete(req.params.id);

		// Vérification de l'existence du livre
		if (!book) {
			return res.status(404).json({
				success: false,
				message: "Livre non trouvé",
			});
		}

		// Réponse avec succès
		res.status(200).json({
			success: true,
			message: "Livre supprimé avec succès",
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la suppression du livre",
			error: error.message,
		});
	}
};

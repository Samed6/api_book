const Author = require("../models/Author");
const Book = require("../models/Book");

// Récupérer tous les auteurs
exports.getAllAuthors = async (req, res) => {
	try {
		// Récupération de tous les auteurs
		const authors = await Author.find();

		// Réponse avec la liste des auteurs
		res.status(200).json({
			success: true,
			count: authors.length,
			data: authors,
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la récupération des auteurs",
			error: error.message,
		});
	}
};

// Récupérer un auteur par son ID
exports.getAuthorById = async (req, res) => {
	try {
		// Récupération de l'auteur avec l'ID fourni
		const author = await Author.findById(req.params.id);

		// Vérification de l'existence de l'auteur
		if (!author) {
			return res.status(404).json({
				success: false,
				message: "Auteur non trouvé",
			});
		}

		// Récupération des livres de l'auteur
		const books = await Book.find({ author: req.params.id });

		// Réponse avec l'auteur et ses livres
		res.status(200).json({
			success: true,
			data: {
				...author.toObject(),
				books,
			},
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la récupération de l'auteur",
			error: error.message,
		});
	}
};

// Créer un nouvel auteur
exports.createAuthor = async (req, res) => {
	try {
		// Création d'un nouvel auteur
		const author = await Author.create(req.body);

		// Réponse avec le nouvel auteur
		res.status(201).json({
			success: true,
			data: author,
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la création de l'auteur",
			error: error.message,
		});
	}
};

// Mettre à jour un auteur
exports.updateAuthor = async (req, res) => {
	try {
		// Mise à jour de l'auteur avec l'ID fourni
		const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
			new: true, // Retourner le document mis à jour
			runValidators: true, // Exécuter les validateurs Mongoose
		});

		// Vérification de l'existence de l'auteur
		if (!author) {
			return res.status(404).json({
				success: false,
				message: "Auteur non trouvé",
			});
		}

		// Réponse avec l'auteur mis à jour
		res.status(200).json({
			success: true,
			data: author,
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la mise à jour de l'auteur",
			error: error.message,
		});
	}
};

// Supprimer un auteur
exports.deleteAuthor = async (req, res) => {
	try {
		// Vérification si l'auteur a des livres
		const books = await Book.find({ author: req.params.id });

		if (books.length > 0) {
			return res.status(400).json({
				success: false,
				message:
					"Impossible de supprimer l'auteur car il a des livres associés",
			});
		}

		// Suppression de l'auteur avec l'ID fourni
		const author = await Author.findByIdAndDelete(req.params.id);

		// Vérification de l'existence de l'auteur
		if (!author) {
			return res.status(404).json({
				success: false,
				message: "Auteur non trouvé",
			});
		}

		// Réponse avec succès
		res.status(200).json({
			success: true,
			message: "Auteur supprimé avec succès",
		});
	} catch (error) {
		// Gestion des erreurs
		res.status(500).json({
			success: false,
			message: "Erreur lors de la suppression de l'auteur",
			error: error.message,
		});
	}
};

const mongoose = require("mongoose");

// Définition du schéma livre
const bookSchema = new mongoose.Schema({
	// Titre du livre
	title: {
		type: String,
		required: [true, "Le titre du livre est obligatoire"],
		trim: true,
	},
	// Description du livre
	description: {
		type: String,
		trim: true,
	},
	// Année de publication
	publishedYear: {
		type: Number,
		min: [0, "L'année de publication doit être positive"],
		max: [
			new Date().getFullYear(),
			"L'année de publication ne peut pas être dans le futur",
		],
	},
	// Genre du livre (fiction, non-fiction, etc.)
	genre: {
		type: String,
		trim: true,
	},
	// ISBN du livre
	isbn: {
		type: String,
		trim: true,
		unique: true,
		sparse: true, // Permet d'avoir plusieurs valeurs nulles
	},
	// Référence à l'auteur du livre
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Author",
		required: [true, "Un livre doit avoir un auteur"],
	},
	// Nombre de pages
	pages: {
		type: Number,
		min: [1, "Le nombre de pages doit être positif"],
	},
	// Date de création dans la base de données
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Middleware pour peupler l'auteur lors des requêtes find
bookSchema.pre(/^find/, function (next) {
	this.populate({
		path: "author",
		select: "name biography", // Sélectionner uniquement le nom et la biographie de l'auteur
	});
	next();
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

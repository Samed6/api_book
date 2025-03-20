const mongoose = require("mongoose");

// Définition du schéma auteur
const authorSchema = new mongoose.Schema(
	{
		// Nom de l'auteur
		name: {
			type: String,
			required: [true, "Le nom de l'auteur est obligatoire"],
			trim: true,
		},
		// Biographie de l'auteur
		biography: {
			type: String,
			trim: true,
		},
		// Date de naissance
		birthDate: {
			type: Date,
		},
		// Nationalité de l'auteur
		nationality: {
			type: String,
			trim: true,
		},
		// Date de création dans la base de données
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		// Activer les virtuals pour pouvoir accéder aux livres associés
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

// Propriété virtuelle pour récupérer les livres associés à cet auteur
authorSchema.virtual("books", {
	ref: "Book",
	localField: "_id",
	foreignField: "author",
});

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;

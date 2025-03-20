const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Définition du schéma utilisateur
const userSchema = new mongoose.Schema({
	// Nom d'utilisateur, unique pour éviter les doublons
	username: {
		type: String,
		required: [true, "Le nom d'utilisateur est obligatoire"],
		unique: true,
		trim: true,
	},
	// Email, unique et validé par un regex simple
	email: {
		type: String,
		required: [true, "L'email est obligatoire"],
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Veuillez fournir un email valide",
		],
	},
	// Mot de passe haché
	password: {
		type: String,
		required: [true, "Le mot de passe est obligatoire"],
		minlength: 6,
		select: false, // Ne pas inclure par défaut dans les requêtes
	},
	// Date de création du compte
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

// Middleware pour hasher le mot de passe avant l'enregistrement
userSchema.pre("save", async function (next) {
	// Ne hasher que si le mot de passe a été modifié
	if (!this.isModified("password")) {
		return next();
	}

	try {
		// Génération d'un sel avec 10 tours
		const salt = await bcrypt.genSalt(10);
		// Hachage du mot de passe avec le sel
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error);
	}
});

// Méthode pour comparer les mots de passe
userSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

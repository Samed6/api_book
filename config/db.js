const mongoose = require("mongoose");

// Fonction de connexion à MongoDB
const connectDB = async () => {
	try {
		// Gérer les caractères spéciaux dans le mot de passe
		const mongoURI = process.env.MONGODB_URI;

		// Options de connexion pour éviter les avertissements de dépréciation
		const conn = await mongoose.connect(mongoURI, {
			// Plus nécessaire dans les versions récentes de Mongoose
		});

		console.log(`MongoDB connecté: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Erreur de connexion à MongoDB: ${error.message}`);
		// Quitter le processus en cas d'échec avec un code d'erreur
		process.exit(1);
	}
};

module.exports = connectDB;

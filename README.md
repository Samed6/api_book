# API Bibliothèque - Guide Débutant

Cette application vous permet de gérer une bibliothèque en ligne avec des livres et des auteurs. C'est comme une base de données que vous pouvez contrôler via internet !

## Ce que vous pouvez faire

- Ajouter, voir, modifier et supprimer des livres
- Ajouter, voir, modifier et supprimer des auteurs
- Créer un compte et vous connecter pour protéger vos données

## Pour démarrer le projet

### Étape 1: Installer les outils

Assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version recommandée: 14.x ou plus)
- [MongoDB](https://www.mongodb.com/try/download/community) OU un compte MongoDB Atlas (gratuit)

### Étape 2: Installer les fichiers du projet

Ouvrez votre terminal et tapez :

```
npm install
```

Cette commande télécharge tous les outils dont le projet a besoin.

### Étape 3: Configurer le projet

Créez un fichier appelé `.env` avec ces informations :

```
PORT=3001
MONGODB_URI=votre_lien_mongodb
JWT_SECRET=choisissez_un_mot_secret
JWT_EXPIRES_IN=24h
```

Remplacez "votre_lien_mongodb" par votre lien de connexion.

### Étape 4: Démarrer le serveur

```
npm run dev
```

Votre API est maintenant accessible à l'adresse: http://localhost:3001

## Comment utiliser l'API

Pour tester l'API, utilisez [Postman](https://www.postman.com/downloads/) (un outil gratuit).

### 1. Créer un compte

- Méthode: POST
- URL: http://localhost:3001/api/register
- Corps (format JSON):

```json
{
	"username": "votre_nom",
	"email": "votre_email@exemple.com",
	"password": "votre_mot_de_passe"
}
```

### 2. Se connecter

- Méthode: POST
- URL: http://localhost:3001/api/login
- Corps (format JSON):

```json
{
	"email": "votre_email@exemple.com",
	"password": "votre_mot_de_passe"
}
```

Vous recevrez un token (une clé d'accès) - copiez-le !

### 3. Ajouter un auteur

- Méthode: POST
- URL: http://localhost:3001/api/authors
- Headers:
  - Clé: `Authorization`
  - Valeur: `Bearer votre_token` (remplacez "votre_token" par le token copié)
- Corps (format JSON):

```json
{
	"name": "Victor Hugo",
	"biography": "Écrivain français du 19e siècle",
	"nationality": "Française"
}
```

### 4. Ajouter un livre

- Méthode: POST
- URL: http://localhost:3001/api/books
- Headers: même `Authorization` que précédemment
- Corps (format JSON):

```json
{
	"title": "Les Misérables",
	"description": "Un roman historique français",
	"publishedYear": 1862,
	"genre": "Roman",
	"author": "id_de_l_auteur"
}
```

Remplacez "id_de_l_auteur" par l'ID reçu lors de la création de l'auteur.

### 5. Voir tous les livres

- Méthode: GET
- URL: http://localhost:3001/api/books
- Pas besoin de token ni de corps !

## Organisation des fichiers

- `server.js` : Le point de départ de l'application
- `models/` : Définit la structure des données (livres, auteurs, utilisateurs)
- `controllers/` : Contient la logique des opérations (ajouter, modifier, etc.)
- `routes/` : Définit les chemins d'accès URL de l'API
- `middleware/` : Contient les fonctions de sécurité
- `config/` : Gère la connexion à la base de données

## Problèmes courants

- **"Route non trouvée"** : Vérifiez que l'URL est correcte et que vous utilisez la bonne méthode (GET, POST, etc.)
- **"Non autorisé"** : Vérifiez que votre token est correctement formaté avec `Bearer` suivi d'un seul espace
- **Problème de connexion à MongoDB** : Vérifiez que votre lien MongoDB est correct dans le fichier .env

## Ressources pour apprendre

- [MDN Web Docs](https://developer.mozilla.org/fr/) pour apprendre JavaScript
- [Express.js](https://expressjs.com/fr/) pour comprendre le framework
- [MongoDB Documentation](https://docs.mongodb.com/) pour la base de données

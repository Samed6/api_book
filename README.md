# API de Gestion de Bibliothèque

Cette API RESTful permet aux utilisateurs de gérer une bibliothèque de livres avec des fonctionnalités CRUD pour les livres et les auteurs, ainsi qu'une authentification JWT pour protéger certaines routes.

## Fonctionnalités

- **CRUD des livres** : Créer, lire, mettre à jour et supprimer des livres
- **CRUD des auteurs** : Gérer les auteurs et leurs informations
- **Authentification JWT** : Protéger les routes de modification (POST, PUT, DELETE)
- **Relations entre collections** : Les livres font référence à leurs auteurs

## Technologies utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcrypt pour le hachage des mots de passe

## Installation

1. Cloner le dépôt

```bash
git clone <url-du-depot>
cd api-bi
```

2. Installer les dépendances

```bash
npm install
```

3. Configurer les variables d'environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=votre_secret_jwt
JWT_EXPIRES_IN=24h
```

4. Démarrer le serveur

```bash
npm start
```

Pour le développement, vous pouvez utiliser :

```bash
npm run dev
```

## Structure du projet

```
api-bi/
├── config/         # Configuration de la base de données
├── controllers/    # Contrôleurs pour les routes
├── middleware/     # Middleware d'authentification
├── models/         # Modèles Mongoose
├── routes/         # Routes de l'API
├── .env            # Variables d'environnement
├── package.json    # Dépendances
├── server.js       # Point d'entrée de l'application
└── README.md       # Documentation
```

## Routes de l'API

### Authentification

- `POST /api/register` : Créer un nouvel utilisateur
- `POST /api/login` : Connecter un utilisateur et obtenir un token JWT
- `GET /api/me` : Obtenir les informations de l'utilisateur connecté (protégé)

### Livres

- `GET /api/books` : Récupérer tous les livres (public)
- `GET /api/books/:id` : Récupérer un livre par son ID (public)
- `POST /api/books` : Créer un nouveau livre (protégé)
- `PUT /api/books/:id` : Mettre à jour un livre (protégé)
- `DELETE /api/books/:id` : Supprimer un livre (protégé)

### Auteurs

- `GET /api/authors` : Récupérer tous les auteurs (public)
- `GET /api/authors/:id` : Récupérer un auteur par son ID (public)
- `POST /api/authors` : Créer un nouvel auteur (protégé)
- `PUT /api/authors/:id` : Mettre à jour un auteur (protégé)
- `DELETE /api/authors/:id` : Supprimer un auteur (protégé)

## Authentification

Pour accéder aux routes protégées, vous devez inclure un header d'autorisation avec le token JWT :

```
Authorization: Bearer <votre_token>
```

## Exemples d'utilisation

### Inscription d'un utilisateur

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username": "test", "email": "test@example.com", "password": "password123"}'
```

### Connexion et obtention du token

```bash
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'
```

### Création d'un auteur (route protégée)

```bash
curl -X POST http://localhost:3000/api/authors \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <votre_token>" \
  -d '{"name": "Victor Hugo", "biography": "Écrivain français", "nationality": "Française"}'
```

### Création d'un livre (route protégée)

```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <votre_token>" \
  -d '{"title": "Les Misérables", "description": "Un chef-d'œuvre de la littérature française", "publishedYear": 1862, "genre": "Roman", "author": "<id_auteur>"}'
```

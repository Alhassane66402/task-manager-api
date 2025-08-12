# API de Gestion des Tâches d'Équipe

Une API RESTful complète pour gérer les tâches d'une équipe, développée avec Node.js, Express et MongoDB.

---

## Fonctionnalités

- **Authentification sécurisée** : Inscription et connexion des utilisateurs avec des mots de passe hachés (bcrypt) et des tokens JWT.  
- **Gestion des Tâches (CRUD)** : Créez, lisez, modifiez et supprimez des tâches.  
- **Filtrage & Pagination** : Filtrez les tâches par priorité ou statut, et naviguez à travers des pages de résultats.  
- **Tri** : Triez les tâches par date de création ou titre.  
- **Upload de Fichiers** : Associez une image à une tâche ou à un profil (fonctionnalité de base).  
- **Sécurité** : Utilisation de helmet pour la sécurité des en-têtes et cors pour la gestion des requêtes inter-domaines.  
- **Variables d'Environnement** : Configuration de l'application avec .env et dotenv.  
- **Architecture MVC** : Code organisé en modèles, contrôleurs et routes pour une meilleure maintenabilité.

---

## Technologies Utilisées

- Backend : Node.js, Express  
- Base de Données : MongoDB (via Mongoose)  
- Authentification : JSON Web Tokens (JWT), bcrypt  
- Validation : Joi  
- Upload : Multer  
- Sécurité : Helmet, Cors, Dotenv  
- Outils de développement : Nodemon  

---

## Installation

### Cloner le dépôt

```bash
git clone https://github.com/votre_utilisateur/task-manager-api.git
cd task-manager-api
```

### Installer les dépendances

```bash
npm install
```

### Configurer les variables d'environnement

Créez un fichier `.env` à la racine de votre projet avec les informations suivantes :

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
```

- `MONGO_URI` : L'URI de connexion à votre base de données MongoDB Atlas.  
- `JWT_SECRET` : Une chaîne de caractères secrète pour signer les tokens JWT.

### Lancer l'application

```bash
# En mode développement
npm run dev

# En mode production
npm start
```

### Ajouter ces scripts à votre `package.json` :

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## Endpoints de l'API

L'URL de base pour les requêtes est `http://localhost:5000/api`.

---

### 🔐 Authentification

| Endpoint            | Méthode | Description                                 | Accès  |
|---------------------|---------|---------------------------------------------|--------|
| `/api/auth/register` | POST    | Enregistre un nouvel utilisateur.           | Public |
| `/api/auth/login`    | POST    | Connecte un utilisateur et retourne un token JWT. | Public |

---

### 📝 Tâches

| Endpoint           | Méthode | Description                                              | Accès  |
|--------------------|---------|----------------------------------------------------------|--------|
| `/api/tasks`        | POST    | Crée une nouvelle tâche. Le `x-auth-token` est requis.  | Privé  |
| `/api/tasks`        | GET     | Récupère toutes les tâches. Supporte la pagination, le tri et le filtrage. | Privé  |
| `/api/tasks/:id`    | GET     | Récupère une tâche spécifique par son ID.               | Privé  |
| `/api/tasks/:id`    | PUT     | Met à jour une tâche par son ID. Seul le créateur peut modifier. | Privé  |
| `/api/tasks/:id`    | DELETE  | Supprime une tâche par son ID. Seul le créateur peut supprimer. | Privé  |

---

## Paramètres de Requête GET `/api/tasks`

- `?page=1` : Numéro de la page (par défaut : 1).  
- `?limit=10` : Nombre de tâches par page (par défaut : 10).  
- `?sort=createdAt` ou `?sort=-title` : Tri par champ (`createdAt` ou `title`) et ordre (`-` pour descendant).  
- `?priority=high` : Filtre par priorité (`low`, `medium`, `high`).  
- `?status=in-progress` : Filtre par statut (`pending`, `in-progress`, `completed`).

---

## Exemples de Requêtes (avec Postman)

### 🔐 Authentification

#### 1. Inscription (POST `/api/auth/register`)

Permet de créer un nouvel utilisateur.

**Body (JSON) :**

```json
{
  "name": "Alex Martin",
  "email": "alex.martin@example.com",
  "password": "supersecretpassword123"
}
```

#### 2. Connexion (POST `/api/auth/login`)

Permet de s'authentifier et d'obtenir un token JWT.

**Body (JSON) :**

```json
{
  "email": "alex.martin@example.com",
  "password": "supersecretpassword123"
}
```

**Réponse (JSON) :**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU3YzkwZjkzYzk5YzA2YTgyNzQ1YmU3In0sImlhdCI6MTcwMjkzMjQ2OSwiZXhwIjoxNzAyOTM2MDY5fQ.Lq6bHj1tVz8gQYf6iE42p_6R1N-e9t0c5nJp9n2z6d0"
}
```

⚠️ Note : Utilisez ce token dans l'en-tête `x-auth-token` pour accéder aux routes privées.

---

### 📝 Tâches

#### 3. Créer une tâche (POST `/api/tasks`)

Nécessite le token JWT. Peut inclure une image.

**Header:**  
`x-auth-token: votre_jwt_token`

**Body (form-data) :**

- `title`: "Mise à jour du site web"  
- `description`: "Ajouter les nouvelles fonctionnalités et corriger les bugs."  
- `status`: "in-progress"  
- `priority`: "high"  
- `image`: [fichier à uploader]

#### 4. Récupérer toutes les tâches (GET `/api/tasks`)

Nécessite le token JWT.

**Header:**  
`x-auth-token: votre_jwt_token`

**Exemple d'URL :**  
`http://localhost:5000/api/tasks?page=1&limit=5&sort=-createdAt&priority=high`

#### 5. Récupérer une tâche par ID (GET `/api/tasks/:id`)

Nécessite le token JWT.

**Header:**  
`x-auth-token: votre_jwt_token`

**Exemple d'URL :**  
`http://localhost:5000/api/tasks/657c917d3c99c06a82745be9`

#### 6. Mettre à jour une tâche (PUT `/api/tasks/:id`)

Nécessite le token JWT.

**Header:**  
`x-auth-token: votre_jwt_token`

**Body (JSON) :**

```json
{
  "status": "completed",
  "description": "Mise à jour du site web terminée."
}
```

#### 7. Supprimer une tâche (DELETE `/api/tasks/:id`)

Nécessite le token JWT.

**Header:**  
`x-auth-token: votre_jwt_token`

**Exemple d'URL :**  
`http://localhost:5000/api/tasks/657c917d3c99c06a82745be9`


const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');

/**
 * @swagger
 * tags:
 *   name: Tâches
 *   description: Gestion des tâches
 */

router.use(requireAuth); // toutes les routes nécessitent un token JWT

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Lister toutes les tâches
 *     description: Retourne la liste des tâches avec pagination, tri et filtres (priorité, statut, etc.).
 *     tags: [Tâches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de la page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre de résultats par page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: -createdAt
 *         description: "Champ de tri (ex: createdAt ou -title)"
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Filtrer par priorité
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, in_progress, done]
 *         description: Filtrer par statut
 *     responses:
 *       200:
 *         description: Liste des tâches
 *       401:
 *         description: Non autorisé
 */
router.get('/', getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Créer une tâche
 *     description: Ajoute une nouvelle tâche avec option d'attacher un fichier (image, document).
 *     tags: [Tâches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Préparer le rapport
 *               description:
 *                 "type: string
 *                 example: Rapport mensuel à remettre au client"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: high
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 example: pending
 *               attachment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Tâche créée avec succès
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Non autorisé
 */
router.post('/', upload.single('attachment'), createTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtenir une tâche par ID
 *     description: Retourne les détails d'une tâche spécifique.
 *     tags: [Tâches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche
 *     responses:
 *       200:
 *         description: Détails de la tâche
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Tâche non trouvée
 */
router.get('/:id', getTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Mettre à jour une tâche
 *     description: Modifie une tâche existante. Peut aussi ajouter un nouveau fichier en pièce jointe.
 *     tags: [Tâches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mise à jour du rapport
 *               description:
 *                 "type: string
 *                 example: Rapport mensuel révisé"
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *                 example: medium
 *               status:
 *                 type: string
 *                 enum: [pending, in_progress, done]
 *                 example: in_progress
 *               attachment:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Tâche mise à jour
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Tâche non trouvée
 */
router.put('/:id', upload.single('attachment'), updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Supprimer une tâche
 *     description: Supprime une tâche par son ID.
 *     tags: [Tâches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche
 *     responses:
 *       200:
 *         description: Tâche supprimée avec succès
 *       401:
 *         description: Non autorisé
 *       404:
 *         description: Tâche non trouvée
 */
router.delete('/:id', deleteTask);

module.exports = router;

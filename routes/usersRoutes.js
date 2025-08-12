const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middlewares/auth');
const { listUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

router.use(requireAuth); // toutes les routes ci-dessous nécessitent auth

router.get('/', requireAdmin, listUsers); // seulement admin peut lister tous
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', requireAdmin, deleteUser);

module.exports = router;

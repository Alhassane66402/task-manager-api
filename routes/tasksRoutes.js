const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');

router.use(requireAuth);

router.get('/', getTasks);
router.post('/', upload.single('attachment'), createTask); // form-data avec champ "attachment"
router.get('/:id', getTask);
router.put('/:id', upload.single('attachment'), updateTask);
router.delete('/:id', deleteTask);

module.exports = router;

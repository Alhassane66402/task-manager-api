const Task = require('../models/Task');

const createTask = async (req, res, next) => {
  try {
    const data = req.body;
    if (req.file) {
      data.attachments = [`/uploads/${req.file.filename}`];
    }
    const task = await Task.create(data);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    const sort = req.query.sort || '-createdAt';

    // filtres
    const filter = {};
    if (req.query.priority) filter.priority = req.query.priority;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    if (req.query.search) filter.title = { $regex: req.query.search, $options: 'i' };

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      Task.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('assignedTo', 'name email'),
      Task.countDocuments(filter)
    ]);

    res.json({
      data: items,
      meta: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate('assignedTo', 'name email');
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.$push = { attachments: `/uploads/${req.file.filename}` };
    }
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true }).populate(
      'assignedTo',
      'name email'
    );
    if (!task) return res.status(404).json({ message: 'Tâche non trouvée' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tâche supprimée' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask, getTasks, getTask, updateTask, deleteTask };

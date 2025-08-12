const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3 },
  description: { type: String, default: '' },
  status: { type: String, enum: ['pending','in_progress','done'], default: 'pending' },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dueDate: { type: Date },
  attachments: [{ type: String }], // chemins vers /uploads/...
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

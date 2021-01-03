const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      trim: true,
      required: [true, 'please add the title'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    // The timestamps option tells mongoose to assign createdAt and updatedAt fields to your schema. The type assigned is Date.
    timestamps: true,
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

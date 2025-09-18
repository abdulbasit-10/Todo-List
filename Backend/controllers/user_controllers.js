const Todo = require('../models/user_models.js');

// GET /api/v0/todo/getAllTask
exports.getAllTask = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: todos });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};


// POST /api/v0/todo/postTask
exports.createNewTask = async (req, res) => {
  try {
    const { task, priority, status } = req.body;
    console.log(task, priority, status);  
    if (!task || !priority || !status) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const todo = new Todo({ task, priority, status });
    await todo.save();

    return res.status(201).json({ success: true, data: todo });
  } catch (err) {
    console.error(err);
    // duplicate key (unique) error
    if (err.code === 11000) {
      return res.status(409).json({ success: false, message: 'Task already exists' });
    }
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// PUT /api/v0/todo/updateTask/:taskId
exports.updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const { task, priority, status } = req.body;

    if (!task && !priority && !status) {
      return res.status(400).json({ success: false, message: 'No fields provided to update' });
    }

    const update = {};
    if (task) update.task = task;
    if (priority) update.priority = priority;
    if (status) update.status = status;

    const updatedTask = await Todo.findByIdAndUpdate(taskId, update, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// DELETE /api/v0/todo/deleteTask/:taskId
exports.deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const deletedTask = await Todo.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, message: 'Task deleted successfully', data: deletedTask });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

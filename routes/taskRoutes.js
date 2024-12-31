const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTasks);
router.get('/tasks/:id', authenticate, getTaskById);
router.put('/tasks/:id', authenticate, updateTask);
router.delete('/tasks/:id', authenticate, deleteTask);

module.exports = router;

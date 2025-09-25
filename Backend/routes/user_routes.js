

// routes/user_routes.js
const express = require('express');
const router = express.Router();

const {
  getAllTask,
  createNewTask,
  deleteTask,
  updateTask
} = require('../controllers/user_controllers.js');

/**
 * @openapi
 * /api/v0/todo/getAllTask:
 *   get:
 *     tags:
 *       - Todos
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: Successfully retrieved tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Server error
 */
router.get('/getAllTask', getAllTask);

/**
 * @openapi
 * /api/v0/todo/postTask:
 *   post:
 *     tags:
 *       - Todos
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Missing required fields
 *       409:
 *         description: Task already exists
 *       500:
 *         description: Server error
 */
router.post('/postTask', createNewTask);

/**
 * @openapi
 * /api/v0/todo/updateTask/{taskId}:
 *   put:
 *     tags:
 *       - Todos
 *     summary: Update an existing task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoInput'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *       400:
 *         description: No fields provided to update
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put('/updateTask/:taskId', updateTask);

/**
 * @openapi
 * /api/v0/todo/deleteTask/{taskId}:
 *   delete:
 *     tags:
 *       - Todos
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete('/deleteTask/:taskId', deleteTask);

module.exports = router;

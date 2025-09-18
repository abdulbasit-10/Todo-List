const express = require('express');
const router = express.Router();

const { getAllTask, createNewTask, deleteTask, updateTask } = require('../controllers/user_controllers.js');

router.get('/getAllTask', getAllTask);
router.post('/postTask', createNewTask);
router.delete('/deleteTask/:taskId', deleteTask);
router.put('/updateTask/:taskId', updateTask);

module.exports = router;

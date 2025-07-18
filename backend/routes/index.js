const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');
const { getTask, updateTask, deleteTask, addTask } = require('../controller/controller.js');
const DATA_FILE = path.join(__dirname, '../tasks.json');


router.post('/tasks', addTask);


router.get('/tasks',getTask);


router.put('/tasks/:id',updateTask );


router.delete('/tasks/:id',deleteTask );

module.exports = router;
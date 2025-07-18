const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path');
const DATA_FILE = path.join(__dirname, '../tasks.json');

function readTasks() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8') || '[]');
}


function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

router.post('/tasks', (req, res) => {
  const { title, dueDate, status } = req.body;
  if (!title || !dueDate) return res.status(400).json({ message: 'Title and Due Date required' });

  const tasks = readTasks();
  const newTask = { id: Date.now(), title, dueDate, status: status || 'pending' };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});


router.get('/tasks',);


router.put('/tasks/:id', );


router.delete('/tasks/:id', );

module.exports = router;
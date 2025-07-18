function readTasks() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8') || '[]');
}


function writeTasks(tasks) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}


export const deleteTask=(req, res) => {
  const { id } = req.params;
  let tasks = readTasks();
  tasks = tasks.filter(t => t.id != id);
  writeTasks(tasks);
  res.status(204).send();
}
export const updateTask =(req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const tasks = readTasks();
  const task = tasks.find(t => t.id == id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.status = status;
  writeTasks(tasks);
  res.json(task);
}
export const getTask= (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
}
export const addTask=(req, res) => {
  const { title, dueDate, status } = req.body;
  if (!title || !dueDate) return res.status(400).json({ message: 'Title and Due Date required' });

  const tasks = readTasks();
  const newTask = { id: Date.now(), title, dueDate, status: status || 'pending' };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
}
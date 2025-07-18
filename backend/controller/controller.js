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
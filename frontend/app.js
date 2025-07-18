const API = 'http://localhost:3000/api/v1/tasks';

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const dueDate = document.getElementById('dueDate').value;

  if (!title || !dueDate) return;

  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, dueDate, status: 'pending' })
  });

  document.getElementById('taskForm').reset();
  loadTasks();
});

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className =
      'bg-white shadow p-4 rounded flex justify-between items-start border border-gray-200 hover:shadow-md transition';

    li.innerHTML = `
      <div>
        <h3 class="text-lg font-semibold text-gray-800">${task.title}</h3>
        <p class="text-sm text-gray-500">Due: ${task.dueDate}</p>
        <span class="inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${
          task.status === 'completed'
            ? 'bg-green-100 text-green-700'
            : 'bg-yellow-100 text-yellow-700'
        }">${task.status}</span>
      </div>
      <div class="flex space-x-2 mt-1">
        ${
          task.status !== 'completed'
            ? `<button onclick="markCompleted(${task.id})" class="text-green-600 hover:underline text-sm">Complete</button>`
            : ''
        }
        <button onclick="deleteTask(${task.id})" class="text-red-600 hover:underline text-sm">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

async function markCompleted(id) {
  await fetch(`${API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: 'completed' })
  });
  loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  loadTasks();
}

loadTasks();

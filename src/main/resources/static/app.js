async function fetchTasks() {
    try {
        const response = await fetch('/todos', { method: 'GET' });
        if (response.ok) {
            const todos = await response.json();
            console.log("Fetched todos:", todos); // Log to inspect the data structure
            loadTodos(todos); // Pass the todos to loadTodos for rendering
        } else {
            console.error('Failed to fetch tasks');
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

function loadTodos(todos) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the list

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.title; // Display the task title
        taskList.appendChild(listItem);
    });
}

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value;

    if (taskTitle === '') {
        console('The title is empty');
        return;
    }

    fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: taskTitle })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add task.')
        }
        return response.json();
    })
    .then(data => {
        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.textContent = data.title;
        taskList.appendChild(taskItem);
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

// Call loadTodos() initially to load the tasks when the page loads
window.onload = fetchTasks();

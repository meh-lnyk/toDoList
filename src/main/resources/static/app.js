async function fetchToDos() {
    try {
        const response = await fetch('/todos', { method: 'GET' });
        if (response.ok) {
            const todos = await response.json();
            console.log("Fetched todos:", todos); // Log to inspect the data structure
            loadTodos(todos); // Pass the todos to loadTodos for rendering
        } else {
            console.error('Failed to fetch todos');
        }
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

function loadTodos(todos = []) {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clear the list

    todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.textContent = todo.title; // Display the todo title
        todoList.appendChild(listItem);
    });
}

function addToDo() {
    const todoTitle = document.getElementById('todoTitle').value;

    if (todoTitle === '') {
        console.log('The title is empty');
        return;
    }

    fetch('http://localhost:8080/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: todoTitle })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add todo.')
        }
        return response.json();
    })
    .then(data => {
        const todoList = document.getElementById('todoList');
        const todoItem = document.createElement('li');
        todoItem.textContent = data.title;
        todoList.appendChild(todoItem);  
        return fetchToDos();
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

// Call loadTodos() initially to load the todos when the page loads
window.onload = function() {
    fetchToDos()
};

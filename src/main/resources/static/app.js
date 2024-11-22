async function fetchToDos() {
    console.log('fetchToDos() is called')
    try {
        const response = await fetch('http://localhost:8080/todolist', { method: 'GET' });
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

function addToDo() {
    const todoTitle = document.getElementById('todoTitle').value;

    if (todoTitle === '') {
        console.log('The title is empty');
        return;
    }

    fetch('http://localhost:8080/todolist', {
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
    .then(() => {
        fetchToDos();
    })
    .catch(error => {
        console.error('Error:', error)
    });
}

function loadTodos(todos = []) {
    console.log('loadTodos() is called');
    console.log(todos);
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clear the list

    todos.forEach(todo => {
        const todoItem = document.createElement('li');
        todoItem.textContent = todo.title; // Display the todo title

        const deleteToDoButton = document.createElement('button');
        deleteToDoButton.textContent = 'X';
        deleteToDoButton.classList.add('delete-td-btn'); // For styling
        deleteToDoButton.onclick = () => deleteToDo(todo.id);

        const todoCompletionCheckbox = document.createElement('input');
        todoCompletionCheckbox.type = 'checkbox';
        todoCompletionCheckbox.checked = todo.isCompleted;
        todoCompletionCheckbox.addEventListener('change', () => toggleCompletion(todo.id, todoCompletionCheckbox.checked));

        todoItem.appendChild(deleteToDoButton);
        todoItem.appendChild(todoCompletionCheckbox);
        todoList.appendChild(todoItem);
    });
}

function deleteToDo(id) {
    fetch(`http://localhost:8080/todolist/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete todo.');
        }
        fetchToDos();
    })
    .catch(error => {
        console.error('Error:', error);
    })
}

function toggleCompletion(id, isCompleted) {
    console.log('toggleCompleted() is called')
    fetch(`http://localhost:8080/todolist/${id}/complete?is_completed=${isCompleted}`, {
        method: 'PATCH'
    })
    .then(response => {
        if (response.ok) {
            console.log('toggleCompleted() is ok')
            console.log('isCompleted:', isCompleted);
            fetchToDos();
        } else {
            throw new Error('Failed to update completion status.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Call fetchToDos() initially to load the todos when the page loads
window.onload = function() {
    fetchToDos()
};

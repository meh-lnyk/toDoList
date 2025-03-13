function fetchToDos() {
    fetch('https://todo.meh-lnyk.site/todolist')
        .then(response => response.json())
        .then(todos => {
            const todoList = document.getElementById('todoList');
            todoList.innerHTML = ''; // Clearing the list

            todos.forEach(todo => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="todo-checkbox" 
                        data-todo-id="${todo.id}" 
                        ${todo.completed ? 'checked' : ''}
                        onchange="handleCheckboxChange(this)"
                    >
                    ${todo.title}
                `;
                todoList.appendChild(listItem);
            });
            console.log('Fetched ToDos:', todos);
            loadTodos(todos);
        })
        .catch(error => {
            console.error('Error fetching todos:', error);
        });
}

function addToDo() {
    const todoTitle = document.getElementById('todoTitle').value;

    if (todoTitle === '') {
        console.log('The title is empty');
        return;
    }

    fetch('https://todo.meh-lnyk.site/todolist', {
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
    console.log('Loading todos...');
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = ''; // Clearing the list

    todos.forEach(todo => {
        const todoItem = document.createElement('li');

        const todoCompletionCheckbox = document.createElement('input');
        todoCompletionCheckbox.type = 'checkbox';
        todoCompletionCheckbox.checked = todo.completed;
        todoCompletionCheckbox.dataset.todoId = todo.id; // Storing the ID in a data attribute
        todoCompletionCheckbox.addEventListener('change', () => handleCheckboxChange(todoCompletionCheckbox));

        // Displaying the todo title
        const todoTitle = document.createTextNode(todo.title);

        if (todo.isCompleted) {
            todoItem.classList.add('completed');
            console.log('added completed class');
        }

        const deleteToDoButton = document.createElement('button');
        deleteToDoButton.textContent = 'X';
        deleteToDoButton.classList.add('delete-td-btn'); // For styling
        deleteToDoButton.onclick = () => deleteToDo(todo.id);

        todoItem.appendChild(todoCompletionCheckbox);
        todoItem.appendChild(todoTitle);
        todoItem.appendChild(deleteToDoButton);

        todoList.appendChild(todoItem);
    });
}

function deleteToDo(id) {
    fetch(`https://todo.meh-lnyk.site/todolist/${id}`, {
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
    console.log('Toggling completion...');
    fetch(`https://todo.meh-lnyk.site/todolist/${id}/complete`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_completed: isCompleted }), // Sending the flag in the request body
    })
    .then(response => {
        if (response.ok) {
            console.log('Completion toggled succesfully');
            fetchToDos();
        } else {
            throw new Error('Failed to update completion status.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function handleCheckboxChange(checkbox) {
    const todoId = checkbox.dataset.todoId; // Reading todo ID from data attribute
    const isCompleted = checkbox.checked;  // Checkbox state (checked/unchecked)
    toggleCompletion(todoId, isCompleted);
}

// Calling fetchToDos() initially to load the todos when the page loads
window.onload = function() {
    fetchToDos()
};

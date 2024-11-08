package com.nkmory.todolist.services;

import com.nkmory.todolist.models.ToDo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ToDoService {

    private List<ToDo> todoList = new ArrayList<>(); // In-memory storage for demo

    // Retrieve all todos
    public List<ToDo> getAllTodos() {
        return todoList;
    }

    // Create a new todo
    public ToDo createToDo(ToDo todo) {
        todoList.add(todo);
        return todo;
    }
    
}

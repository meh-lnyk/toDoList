package com.nkmory.todolist.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.nkmory.todolist.models.ToDo;

@Service
public class ToDoService {

    private static List<ToDo> todoList = new ArrayList<>(); // In-memory storage for demo
    
        // Retrieve all todos
        public List<ToDo> getAllTodos() {
            return todoList;
        }
    
        // Create a new todo
        public static ToDo createToDo(ToDo todo) {
            todoList.add(todo);
        return todo;
    }
    
}

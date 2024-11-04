package com.nkmory.todolist;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/todos")
public class ToDoController {

    private List<ToDo> todoList = new ArrayList<>(); // In-memory storage for demo

    // GET /todos - Retrieve the list of todos
    @GetMapping
    public List<ToDo> getToDos() {
        return todoList; // Return the list of todos
    }

    // POST /todos - Create a new todo
    @PostMapping
    public ToDo createToDo(@RequestBody ToDo todo) {
        todoList.add(todo); // Add the new todo to the list
        return todo; // Return the created todo
    }
}
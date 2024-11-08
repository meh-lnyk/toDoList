package com.nkmory.todolist.controllers;

import com.nkmory.todolist.models.ToDo;
import com.nkmory.todolist.services.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
public class ToDoController {

    private final ToDoService todoService;

    // Inject the ToDoService into the controller
    @Autowired
    public ToDoController(ToDoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<ToDo> getAllTodos() {
        return todoService.getAllTodos();
    }

    @PostMapping
    public ToDo createToDo(@RequestBody ToDo todo) {
        return todoService.createToDo(todo);
    }
}

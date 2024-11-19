//Even though it shows an error do NOT delete it
package com.nkmory.todolist.controllers;

import com.nkmory.todolist.models.ToDo;
import com.nkmory.todolist.services.ToDoService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<ToDo> getToDos() {
        return todoService.getToDos();
    }

    @PostMapping
    public ResponseEntity<ToDo> createToDo(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        ToDo todo = todoService.createToDo(title);
        return ResponseEntity.ok(todo);
    }
}

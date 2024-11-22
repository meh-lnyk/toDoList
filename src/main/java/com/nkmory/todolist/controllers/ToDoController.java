//Even though it shows an error do NOT delete it
package com.nkmory.todolist.controllers;

import java.util.Arrays;

import com.nkmory.todolist.models.ToDo;
import com.nkmory.todolist.services.ToDoService;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.annotation.PostConstruct;

// @CrossOrigin(origins = "http://localhost:8080/todolist")
@RestController
@RequestMapping("/todolist")
public class ToDoController {

    private final ToDoService todoService;

    // Inject the ToDoService into the controller
    @Autowired
    public ToDoController(ToDoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    public ResponseEntity<ToDo> createToDo(@RequestBody Map<String, String> request) {
        String title = request.get("title");
        ToDo todo = todoService.createToDo(title);
        return ResponseEntity.ok(todo);
    }

    @GetMapping
    public List<ToDo> getToDos() {
        return todoService.getToDos();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToDo(@PathVariable Long id) {
        todoService.deleteToDoById(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<ToDo> updateCompletionStatus(@PathVariable Long id, @RequestParam boolean is_completed) {
        Optional<ToDo> todoOptional = todoService.getToDoById(id);
        if (todoOptional.isPresent()) {
            ToDo todo = todoOptional.get();
            todo.setCompleted(is_completed);
            todoService.saveToDo(todo);
            return ResponseEntity.ok(todo);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostConstruct
    public void logEntityMappings() {
        System.out.println("Mapped column: " + Arrays.toString(this.getClass().getDeclaredFields()));
    }
}

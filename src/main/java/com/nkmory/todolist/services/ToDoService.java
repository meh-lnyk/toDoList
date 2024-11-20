package com.nkmory.todolist.services;

import com.nkmory.todolist.models.ToDo;
import com.nkmory.todolist.repositories.ToDoRepository;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository todoRepository;

    public ToDo createToDo(String title) {
        ToDo todo = new ToDo();
        todo.setTitle(title);
        todo.setCompleted(false);
        return todoRepository.save(todo);
    }

    public List<ToDo> getToDos() {
        return todoRepository.findAll();
    }

    public void deleteToDoById(Long id) {
        todoRepository.deleteById(id);
    }
}

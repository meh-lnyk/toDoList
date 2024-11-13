package com.nkmory.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nkmory.todolist.models.ToDo;

@Repository  // Marks this interface as a Spring Data Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    
}

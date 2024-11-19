//Even though it shows an error do NOT delete it
package com.nkmory.todolist.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nkmory.todolist.models.ToDo;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    
}

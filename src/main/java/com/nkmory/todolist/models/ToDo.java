package com.nkmory.todolist.models;

public class ToDo {
    private String title;
    private boolean completed;
    
    public ToDo(){}

    // Constructor
    public ToDo(String title, boolean completed) {
        this.title = title;
        this.completed = completed;
    }

    // Getters and Setters
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}

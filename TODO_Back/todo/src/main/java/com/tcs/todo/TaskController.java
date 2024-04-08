package com.tcs.todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;


import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "http://localhost:3000")

public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/getAll")
    public List<Task> getMethodName() {
        return taskService.getAlltask();
    }

    @PostMapping("/postTask")
    public void postMethodName(@RequestBody Task task) {
        taskService.postTask(task);
    }

    @DeleteMapping("/deleteTask/{Id}")
    public void dleteTask(@PathVariable Long Id) {
        taskService.deletById(Id);
    }

    @DeleteMapping("/deleteAll")
    public void deleteAll(){
        taskService.deleteAll();
    }

}

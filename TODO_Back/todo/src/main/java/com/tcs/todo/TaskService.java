package com.tcs.todo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class TaskService {

    @Autowired
    private TaskRepo taskRepo;

    public void postTask(Task task)
    {
        taskRepo.save(task);
    }

    public List<Task> getAlltask()
    {
       return  taskRepo.findAll();
    }

    public void deletById(Long Id)
    {
        taskRepo.deleteById(Id);
    }

    public void deleteAll()
    {
        taskRepo.deleteAll();
    }
    
}

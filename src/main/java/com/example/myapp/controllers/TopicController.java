package com.example.myapp.controllers;

import com.example.myapp.models.Topic;
import com.example.myapp.services.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins="*")
public class TopicController {
    @Autowired
    TopicService topicService;

    @GetMapping("/api/topics")
    public List<Topic> findAllTopics(){
        return topicService.findAllTopics();
    }
}

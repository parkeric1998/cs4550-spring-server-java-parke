package com.example.myapp.services;

import com.example.myapp.models.Topic;
import com.example.myapp.repositories.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    @Autowired
    TopicRepository topicRepository;

    public List<Topic> findAllTopics(){
        return (List<Topic>)topicRepository.findAll();
    }
}

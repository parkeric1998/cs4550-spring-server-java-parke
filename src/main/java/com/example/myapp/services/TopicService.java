package com.example.myapp.services;

import com.example.myapp.models.Topic;
import com.example.myapp.models.Widget;
import com.example.myapp.repositories.TopicRepository;
import com.example.myapp.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    @Autowired
    TopicRepository topicRepository;

    @Autowired
    WidgetRepository widgetRepository;

    public Topic createTopic(Topic newTopic) {
        return topicRepository.save(newTopic);
    }

    public List<Topic> findTopicsForLesson(String lid) {
        return topicRepository.findTopicsForLesson(lid);

    }

    public int updateTopic(int tid, Topic newTopic) {
        topicRepository.save(newTopic);
        return 1;
    }

    public int deleteTopic(int tid) {
        topicRepository.deleteById(tid);
        return 1;
    }

    public List<Topic> findAllTopics(){
        return (List<Topic>)topicRepository.findAll();
    }



    public Topic findTopicById(Integer topicId){
        return topicRepository.findTopicById(topicId);

    }

    public Widget createWidgetForTopic(
            Integer tid,
            Widget newWidget) {
        Topic topic = topicRepository.findById(tid).get();
        newWidget.setTopic(topic);
        return widgetRepository.save(newWidget);
    }


}

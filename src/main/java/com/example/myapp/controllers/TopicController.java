package com.example.myapp.controllers;

import com.example.myapp.models.Topic;
import com.example.myapp.models.Widget;
import com.example.myapp.services.TopicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class TopicController {
    @Autowired
    TopicService topicService;

    @PostMapping("/api/lessons/{lid}/topics")
    public Topic createTopicForLesson(
            @PathVariable("lid") String lessonId,
            @RequestBody Topic newTopic
    ) {
        newTopic.setLessonId(lessonId);
        return topicService.createTopic(newTopic);
    }

    @GetMapping("/api/lessons/{lessonId}/topics")
    public List<Topic> findTopicsForLesson(
            @PathVariable("lessonId") String lessonId
    ) {
        return topicService.findTopicsForLesson(lessonId);
    }

    @PutMapping("/api/topics/{topicId}")
    public int updateWidget(
            @PathVariable("topicId") Integer tid, @RequestBody Topic updatedTopic) {
        return topicService.updateTopic(tid, updatedTopic);
    }

    @DeleteMapping("/api/topics/{topicId}")
    public int deleteTopic(
            @PathVariable("topicId") Integer tid) {
        return topicService.deleteTopic(tid);
    }

    @GetMapping("/api/topics")
    public List<Topic> findAllTopics() {
        return topicService.findAllTopics();
    }

    @GetMapping("/api/topics/{topicId}")
    public Topic findTopicById(
            @PathVariable("topicId") Integer tid) {
        return topicService.findTopicById(tid);
    }

}

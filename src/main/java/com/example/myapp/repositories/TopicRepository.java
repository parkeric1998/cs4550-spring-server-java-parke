package com.example.myapp.repositories;

import com.example.myapp.models.Topic;
import org.springframework.data.repository.CrudRepository;

public interface TopicRepository
        extends CrudRepository<Topic, Integer> {
}

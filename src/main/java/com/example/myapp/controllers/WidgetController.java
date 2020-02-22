package com.example.myapp.controllers;


import com.example.myapp.models.Widget;
import com.example.myapp.services.WidgetService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
public class WidgetController {

    WidgetService service = new WidgetService();


    @PostMapping("/widgets")
    public Widget createWidget(
            @RequestBody Widget newWidget){

        return service.createWidget(newWidget);
    }

    @GetMapping("topics/{tid}/widgets")
    public List<Widget> findWidgetsForTopic(
            @PathVariable("tid") String topicId){
        return service.findWidgetsForTopic(topicId);
    }

    @PutMapping("/widgets/{widgetId}")
    public int updateWidget(
            @PathVariable("widgetId") String wid, @RequestBody Widget updatedWidget){

        return service.updateWidget(wid, updatedWidget);
    }

    @DeleteMapping("/widgets/{widgetId}")
    public int deleteWidget(
            @PathVariable("widgetId") String wid){

        return service.deleteWidget(wid);
    }

    @GetMapping("/widgets")
    public List<Widget> findAllWidgets(){
        return service.findAllWidgets();
    }

    @GetMapping("/widgets/{widgetId}")
    public Widget findWidgetById(
            @PathVariable("widgetId") String wid){

        return service.findWidgetById(wid);
    }

    @GetMapping("/w1")
    public Widget getWidget(){
        Widget w1 = new Widget("123", "Widget 1", "PARAGRAPH");
        return w1;
    }

    @GetMapping("/hello")

    public String sayHello(){
        return "Hello World";
    }

}
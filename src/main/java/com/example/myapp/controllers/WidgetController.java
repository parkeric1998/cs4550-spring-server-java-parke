package com.example.myapp.controllers;


import com.example.myapp.models.Widget;
import com.example.myapp.services.WidgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = {"*"})
public class WidgetController {

    @Autowired
    WidgetService service;

    @GetMapping("/widgets/create")
    public Widget createWidgetNotREST(){
        Widget w1 = new Widget();
        w1.setSize(45);
        w1.setTitle("Big Widget");
        return service.createWidget(w1);
    }

    @PostMapping("/widgets")
    public Widget createWidget(
            @RequestBody Widget newWidget){

        return service.createWidget(newWidget);
    }

//    @GetMapping("topics/{tid}/widgets")
//    public List<Widget> findWidgetsForTopic(
//            @PathVariable("tid") String topicId){
//        return service.findWidgetsForTopic(topicId);
//    }

    @PutMapping("/widgets/{widgetId}")
    public int updateWidget(
            @PathVariable("widgetId") Integer wid, @RequestBody Widget updatedWidget){

        return service.updateWidget(wid, updatedWidget);
    }

    @GetMapping("/widgets/{widgetId}/delete")
    public int deleteWidgetNotREST(
            @PathVariable("widgetId") Integer wid){
        return service.deleteWidget(wid);
    }

    @DeleteMapping("/widgets/{widgetId}")
    public int deleteWidget(
            @PathVariable("widgetId") Integer wid){

        return service.deleteWidget(wid);
    }

    @GetMapping("/widgets")
    public List<Widget> findAllWidgets(){
        return service.findAllWidgets();
    }

    @GetMapping("/widgets/{widgetId}")
    public Widget findWidgetById(
            @PathVariable("widgetId") Integer wid){
        return service.findWidgetById(wid);
    }

}
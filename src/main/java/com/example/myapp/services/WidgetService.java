package com.example.myapp.services;

import com.example.myapp.models.Widget;
import com.example.myapp.repositories.WidgetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WidgetService {
    List<Widget> widgetList = new ArrayList<Widget>();

    @Autowired
    WidgetRepository widgetRepository;

    public Widget createWidget(
            Widget newWidget){
        return widgetRepository.save(newWidget);
    }

    public List<Widget> findWidgetsForTopic(Integer topicId) {

        return widgetRepository.findWidgetsForTopic(topicId);
    }

    public int updateWidget(Integer wid, Widget updatedWidget){
        for(int i = 0; i < widgetList.size(); i++){
            if(widgetList.get(i).getId().equals(wid)){
                widgetList.set(i, updatedWidget);
                return 1;
            }
        }
        return 0;
    }

    public int deleteWidget(Integer wid) {
        widgetRepository.deleteById(wid);
        return 1;
    }

    public List<Widget> findAllWidgets(){
        return widgetRepository.findAllWidgets();
//        return (List<Widget>)widgetRepository.findAll();
    }

    public Widget findWidgetById(Integer wid){
        return widgetRepository.findWidgetById(wid);
//        return widgetRepository.findById(wid).get() ;
    }


}
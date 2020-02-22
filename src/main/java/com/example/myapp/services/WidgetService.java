package com.example.myapp.services;



import com.example.myapp.models.Widget;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class WidgetService {
    List<Widget> widgetList = new ArrayList<Widget>();
    {
        Widget w1 = new Widget("123","WA", "HEADING");
        Widget w2 = new Widget("223","WB","HEADING");
        Widget w3 = new Widget("323","WC","HEADING");
        Widget w4 = new Widget("423","WD", "PARAGRAPH");
        Widget w5 = new Widget("523","WE","PARAGRAPH");

        w1.setTopicId("111");
        w2.setTopicId("111");
        w3.setTopicId("222");
        w4.setTopicId("222");
        w5.setTopicId("222");



        widgetList.add(w1);
        widgetList.add(w2);
        widgetList.add(w3);
        widgetList.add(w4);
        widgetList.add(w5);
    }


    public Widget createWidget(Widget newWidget){
        widgetList.add(newWidget);
        return newWidget;
    }

    public List<Widget> findWidgetsForTopic(String topicId) {
        List<Widget> results = new ArrayList<Widget>();
        for(Widget w:widgetList){
            if(w.getTopicId().equals(topicId)){
                results.add(w);

            }
        }
        return results;
    }

    public int updateWidget(String wid, Widget updatedWidget){
        for(int i = 0; i < widgetList.size(); i++){
            if(widgetList.get(i).getId().equals(wid)){
                widgetList.set(i, updatedWidget);
                return 1;
            }
        }
        return 0;
    }

    public int deleteWidget(String wid) {
        widgetList = widgetList.stream()
                .filter(w-> !w.getId().equals(wid)).collect(Collectors.toList());

        return 1;
    }

    public List<Widget> findAllWidgets(){
        return widgetList;
    }

    public Widget findWidgetById(String wid){
        for(Widget w: widgetList){
            if(w.getId().equals(wid)){
                return w;
            }
        }
        return null;
    }


}
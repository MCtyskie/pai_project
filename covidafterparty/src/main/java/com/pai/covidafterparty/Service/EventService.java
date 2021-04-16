package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    public Event addEvent(Event event){
        return eventRepository.save(event);
    }

    public Optional<Event> getEventById(long eventID){
        return eventRepository.findEventByEventID(eventID);
    }

    public Optional<Event> updateEvent(Event event){
        Event e=eventRepository.findEventByEventID(event.getEventID()).orElse(null);
        if(e!=null){
            return Optional.of(eventRepository.save(event));
        }
        return null;
    }

    public String deleteEvent(long eventID){
        Optional<Event> selectedEvent=eventRepository.findEventByEventID(eventID);
        if(selectedEvent.isPresent()){
            Event event=selectedEvent.get();
            String message=String.format("Event with id: %d deleted",event.getEventID());
            eventRepository.delete(event);
            return message;
        }
        return "";
    }


}

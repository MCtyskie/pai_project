package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.EventRepository;
import com.pai.covidafterparty.Repository.EventRepositoryCustom;
import com.pai.covidafterparty.Repository.EventRepositoryCustomImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private EventRepositoryCustom eventRepositoryCustom;

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

    public boolean deleteEvent(long eventID){
        Optional<Event> selectedEvent=eventRepository.findEventByEventID(eventID);
        if(selectedEvent.isPresent()){
            eventRepository.delete(selectedEvent.get());
            return true;
        } else {
            return false;
        }
    }

    public List<Event.EventItemJSON> getEvents(){
        List<Event> resultList = new ArrayList<>();
        eventRepository.findAll().forEach(resultList::add);
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }

    public List<Event.EventItemJSON> getIncomingEvents(User user){
        List<Event> resultList = new ArrayList<>();
        eventRepository.findIncomingForUser(user.getUserID()).forEach(resultList::add);
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }

    public List<Event.EventDetailsJSON> getFilteredEvents(EventRepositoryCustomImpl.EventFilters eventFilters){
        return eventRepositoryCustom.findByFilters(eventFilters).stream()
                .map(e -> e.getEvenDetailsJSON())
                .collect(Collectors.toList());
    }

}

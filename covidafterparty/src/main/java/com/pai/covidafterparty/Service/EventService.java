package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Review;
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

    //CREATE
    public Optional<Event> addEvent(Event event){
        Event e=eventRepository.findEventByEventID(event.getEventID()).get();
        if(e==null){
            eventRepository.save(event);
            return Optional.of(event);
        }
        return Optional.empty();
    }

    //READ
    public Optional<Event> getEventById(long eventID){
        Event event = eventRepository.findEventByEventID(eventID).get();
        return Optional.of(event);
    }

    //UPDATE
    public Optional<Event> updateEvent(Event event){
        Event e=eventRepository.findEventByEventID(event.getEventID()).get();
        if(e!=null){
            eventRepository.save(event);
            return Optional.of(event);
        }
        return Optional.empty();
    }

    //DELETE
    public Optional<Event> deleteEvent(long eventID){
        Event e=eventRepository.findEventByEventID(eventID).get();
        if(e!=null){
            eventRepository.delete(e);
            return Optional.of(e);
        }
        return Optional.empty();
    }



    public List<Event.EventItemJSON> getEvents(){
        List<Event> resultList = new ArrayList<>();
        eventRepository.findAll().forEach(resultList::add);
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }



    public List<Event.EventDetailsJSON> getFilteredEvents(EventRepositoryCustomImpl.EventFilters eventFilters){
        return eventRepositoryCustom.findByFilters(eventFilters).stream()
                .map(e -> e.getEvenDetailsJSON())
                .collect(Collectors.toList());
    }

}
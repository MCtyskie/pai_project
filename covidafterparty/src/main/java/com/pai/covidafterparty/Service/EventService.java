package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Enums.Activity;
import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.EventRepository;
import com.pai.covidafterparty.Repository.EventRepositoryCustom;
import com.pai.covidafterparty.Repository.EventRepositoryCustomImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EventRepositoryCustom eventRepositoryCustom;

    //CREATE
    public Optional<Event> addEvent(Event event){
        Optional<Event> e=eventRepository.findEventByEventID(event.getEventID());
        if(e.isEmpty()){
            eventRepository.save(event);
            return Optional.of(event);
        }
        return Optional.empty();
    }

    //READ
    public Optional<Event> getEventById(long eventID){
        return eventRepository.findEventByEventID(eventID);
    }

    //UPDATE
    public Optional<Event> updateEvent(Event event){
        Optional<Event> e=eventRepository.findEventByEventID(event.getEventID());
        if(e.isPresent()){
            eventRepository.save(event);
            return Optional.of(event);
        }
        return Optional.empty();
    }

    //DELETE
    public Optional<Event> deleteEvent(long eventID){
        Optional <Event> e=eventRepository.findEventByEventID(eventID);
        if(e.isPresent()){
            eventRepository.delete(e.get());
            return e;
        }
        return Optional.empty();
    }



    public List<Event.EventItemJSON> getEvents(){
        List<Event> resultList = new ArrayList<>();
        eventRepository.findAll().forEach(resultList::add);
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }

    public List<Event.EventItemJSON> getIncomingEvents(User user){
        List<Event> resultList = new ArrayList<>(eventRepository.findIncomingForUser(user.getUserID()));
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }

    public List<Event.EventItemJSON> getFinishedEvents(User user){
        List<Event> resultList = new ArrayList<>(eventRepository.findFinishedForUser(user.getUserID()));
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }

    public List<Event.EventItemJSON> getEventsForOwner(User user){
        List<Event> resultList = new ArrayList<>(eventRepository.findEventByOwner(user));
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }

    public List<Event.EventDetailsJSON> getFilteredEvents(EventRepositoryCustomImpl.EventFilters eventFilters){
        return eventRepositoryCustom.findByFilters(eventFilters).stream()
                .map(e -> e.getEvenDetailsJSON())
                .collect(Collectors.toList());
    }

    public List<Event.EventItemJSON> getEventsOrganisedByUser(User user){
        List<Event> resultList = new ArrayList<>(eventRepository.findEventByOwner(user));
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }

    public List<String> getEventCities(){
        return eventRepository.findDistinctCities();
    }

    public List<Event.EventItemJSON> getEventsToReview(User user) {
        List<Event> resultList = eventRepository.findEventsToReview(user.getUserID());
        return resultList.stream().map(e -> e.getEvenItemJSON()).collect(Collectors.toList());
    }

    @Scheduled(cron = "0 * * * * ?")
    public void setEventsAsCompleted(){
        System.out.println("Scheduled xD: "+ LocalDateTime.now().toString());
        eventRepository.findCompletedEvents()
                .stream()
                .forEach(e -> {
                    e.setActivity(Activity.COMPLETED);
                    eventRepository.save(e);
                });
    }

}
package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.EventRepositoryCustom;
import com.pai.covidafterparty.Repository.EventRepositoryCustomImpl;
import com.pai.covidafterparty.Service.EventService;
import com.pai.covidafterparty.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/event")
public class EventController {
    @Autowired
    EventService eventService;
    @Autowired
    UserService userService;

    @GetMapping("/events")
    ResponseEntity<List<Event.EventItemJSON>> getEvents(){
        return new ResponseEntity<>(eventService.getEvents(), HttpStatus.OK);
    }

    @GetMapping("/details")
    ResponseEntity<Event.EventDetailsJSON> getEventDetails(@RequestParam long eventID){
        Optional<Event> event = eventService.getEventById(eventID);
        if(event.isPresent()){
            return new ResponseEntity<>(event.get().getEvenDetailsJSON(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Event.EventDetailsJSON(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/edit")
    ResponseEntity<String> editEvent(Principal principal, @RequestBody Event.EventDetailsJSON eventDetails, @RequestParam long eventID){
        Optional<Event> eventOptional = eventService.getEventById(eventID);
        if(eventOptional.isPresent()){
            Event event = eventOptional.get();
            event.setEventDate(eventDetails.getEventDate());
            event.setActivity(eventDetails.getActivity());
            event.setOpenEvent(eventDetails.isOpenEvent());
            event.setAgeRestriction(eventDetails.getAgeRestriction());
            event.setCity(eventDetails.getCity());
            event.setDescription(eventDetails.getCity());
            event.setApartmentNumber(eventDetails.getApartmentNumber());
            event.setHouseNumber(eventDetails.getHouseNumber());
            event.setImages(eventDetails.getImages());
            event.setMaxGuests(eventDetails.getMaxGuests());
            event.setPostNumber(eventDetails.getPostNumber());
            event.setStreet(eventDetails.getStreet());
            event.setTags(eventDetails.getTags());
            event.setVisibility(eventDetails.getVisibility());

            eventService.updateEvent(event);

            return new ResponseEntity<>("Event updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete")
    ResponseEntity<String> deleteEvent(Principal principal, @RequestParam long eventID){
        if(Optional.of(eventService.deleteEvent(eventID)).get().isPresent()){
            return new ResponseEntity<>("Event deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
        }
    }

    /*@GetMapping("/incoming_events")
    ResponseEntity<List<Event.EventItemJSON>> incomingEvents(Principal principal){
        List<Event.EventItemJSON> resultList = eventService.getIncomingEvents(userService.getUserByEmail(principal.getName()).get());
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }*/

    /*@GetMapping("/events_filter")
    ResponseEntity<List<Event.EventDetailsJSON>> getFilteredEvents(@RequestBody EventRepositoryCustomImpl.EventFilters eventFilters){
        try{
            return new ResponseEntity<>(eventService.getFilteredEvents(eventFilters), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
        }
    }*/

    @PostMapping("/createEvent")
    ResponseEntity<String> createEvent(Principal principal, @RequestBody Event.EventDetailsJSON eventDetailsJSON){
        Optional<User> owner = userService.getUserByEmail(principal.getName());
        if(owner.isPresent()) {
            Event event = new Event(
                    owner.get(),
                    eventDetailsJSON.getTitle(),
                    eventDetailsJSON.getCity(),
                    eventDetailsJSON.getPostNumber(),
                    eventDetailsJSON.getStreet(),
                    eventDetailsJSON.getHouseNumber(),
                    eventDetailsJSON.getApartmentNumber(),
                    eventDetailsJSON.getEventDate(),
                    eventDetailsJSON.getActivity(),
                    eventDetailsJSON.getVisibility(),
                    eventDetailsJSON.getTags(),
                    eventDetailsJSON.getMaxGuests(),
                    eventDetailsJSON.getCity(),
                    eventDetailsJSON.getImages(),
                    eventDetailsJSON.getAgeRestriction(),
                    eventDetailsJSON.isOpenEvent()
            );
            if(eventService.addEvent(event).isPresent()){
                return new ResponseEntity<>("Event added", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Event not added", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("No owner found", HttpStatus.BAD_REQUEST);
        }

    }


}

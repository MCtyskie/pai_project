package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.parser.Entity;
import java.util.List;
import java.util.Optional;

@RestController
public class EventController {
    @Autowired
    EventService eventService;

    @GetMapping("/event/events")
    ResponseEntity<List<Event.EventItemJSON>> getEvents(){
        return new ResponseEntity<List<Event.EventItemJSON>>(eventService.getEvents(), HttpStatus.OK);
    }

    @GetMapping("/event/details")
    ResponseEntity<Event.EventDetailsJSON> getEventDetails(@RequestParam long eventID){
        Optional<Event> event = eventService.getEventById(eventID);
        if(event.isPresent()){
            return new ResponseEntity<Event.EventDetailsJSON>(event.get().getEvenDetailsJSON(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Event.EventDetailsJSON>(new Event.EventDetailsJSON(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("event/edit")
    ResponseEntity<String> editEvent(@RequestBody Event.EventDetailsJSON eventDetails, @RequestParam long eventID){
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

            return new ResponseEntity<String>("Event updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Event not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/event/delete")
    ResponseEntity<String> deleteEvent(@RequestParam long eventID){
        if(eventService.deleteEvent(eventID)){
            return new ResponseEntity<String>("Event deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("Event not found", HttpStatus.NOT_FOUND);
        }
    }

    

}

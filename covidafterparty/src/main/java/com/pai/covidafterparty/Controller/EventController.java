package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Invitation;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.EventRepositoryCustomImpl;
import com.pai.covidafterparty.Service.EventService;
import com.pai.covidafterparty.Service.InvitationService;
import com.pai.covidafterparty.Service.ReviewService;
import com.pai.covidafterparty.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
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
    private EventService eventService;
    @Autowired
    private InvitationService invitationService;
    @Autowired
    private UserService userService;
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/events")
    ResponseEntity<List<Event.EventItemJSON>> getEvents() {
        return new ResponseEntity<>(eventService.getEvents(), HttpStatus.OK);
    }

    @GetMapping("/details")
    ResponseEntity<Pair<Event.EventDetailsJSON, Pair<List<Review.ReviewJSON>, List<Invitation.InvitationJSON>>>> getEventDetails(@RequestParam long eventID) {
        Optional<Event> event = eventService.getEventById(eventID);
        if (event.isPresent()) {
            return new ResponseEntity<>(Pair.of(
                    event.get().getEvenDetailsJSON(),
                    Pair.of(
                            reviewService.getReviewForEvent(event.get().getEventID()),
                            invitationService.getInvitationsForEvent(event.get().getEventID())
                    )), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(Pair.of(null, null), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/edit")
    ResponseEntity<String> editEvent(Principal principal, @RequestBody Event.EventDetailsJSON eventDetails, @RequestParam long eventID) {
        Optional<Event> eventOptional = eventService.getEventById(eventID);
        if (eventOptional.isPresent()) {
            Event event = eventOptional.get();
            event.setEventDate(eventDetails.getEventDate());
            event.setActivity(eventDetails.getActivity());
            event.setOpenEvent(eventDetails.isOpenEvent());
            event.setAgeRestriction(eventDetails.isAgeRestriction());
            event.setCity(eventDetails.getCity());
            event.setDescription(eventDetails.getCity());
            event.setApartmentNumber(eventDetails.getApartmentNumber());
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
    ResponseEntity<String> deleteEvent(Principal principal, @RequestParam long eventID) {
        if (Optional.of(eventService.deleteEvent(eventID)).get().isPresent()) {
            return new ResponseEntity<>("Event deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Event not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/incoming_events")
    ResponseEntity<List<Event.EventItemJSON>> incomingEvents(Principal principal) {
        if (userService.getUserByEmail(principal.getName()).isPresent()) {
            List<Event.EventItemJSON> resultList = eventService.getIncomingEvents(userService.getUserByEmail(principal.getName()).get());
            return new ResponseEntity<>(resultList, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/events_filter")//ZMIENIONO
    ResponseEntity<List<Event.EventDetailsJSON>> getFilteredEvents(@RequestBody EventRepositoryCustomImpl.EventFilters eventFilters) {
        try {
            return new ResponseEntity<>(eventService.getFilteredEvents(eventFilters), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create_event")//ZMIENIONE
    ResponseEntity<String> createEvent(Principal principal, @RequestBody Event.EventDetailsJSON eventDetailsJSON) {
        Optional<User> owner = userService.getUserByEmail(principal.getName());
        if (owner.isPresent()) {
            Event event = new Event(
                    owner.get(),
                    eventDetailsJSON.getTitle(),
                    eventDetailsJSON.getCity(),
                    eventDetailsJSON.getPostNumber(),
                    eventDetailsJSON.getStreet(),
                    eventDetailsJSON.getApartmentNumber(),
                    eventDetailsJSON.getEventDate(),
                    eventDetailsJSON.getActivity(),
                    eventDetailsJSON.getVisibility(),
                    eventDetailsJSON.getTags(),
                    eventDetailsJSON.getMaxGuests(),
                    eventDetailsJSON.getDescription(),
                    eventDetailsJSON.getImages(),
                    eventDetailsJSON.isAgeRestriction(),
                    eventDetailsJSON.isOpenEvent()
            );
            if (eventService.addEvent(event).isPresent()) {
                return new ResponseEntity<>("Event added", HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Event not added", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("No owner found", HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("manage_events")//ZMIENIONE
    ResponseEntity<List<Pair<Event.EventItemJSON, List<Invitation.InvitationJSON>>>> getUserEventsWithInvitations(Principal principal) {
        Optional<User> owner = userService.getUserByEmail(principal.getName());
        List<Pair<Event.EventItemJSON, List<Invitation.InvitationJSON>>> eventsWithInvitations = new ArrayList<>();
        if (owner.isPresent()) {
            List<Event.EventItemJSON> events = eventService.getEventsOrganisedByUser(owner.get());
            events.forEach((event) -> {
                List<Invitation.InvitationJSON> invitations = invitationService.invPerEvent(event.getEventID());
                Pair<Event.EventItemJSON, List<Invitation.InvitationJSON>> eventWithInvitations = Pair.of(event, invitations);
                eventsWithInvitations.add(eventWithInvitations);
            });
        } else {
            return new ResponseEntity<>(eventsWithInvitations, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(eventsWithInvitations, HttpStatus.OK);
    }

    @GetMapping("/cities")
    ResponseEntity<List<String>> getCitiesList() {
        return new ResponseEntity<>(eventService.getEventCities(), HttpStatus.OK);
    }

    @GetMapping("/events_for_owner")
    ResponseEntity<List<Event.EventItemJSON>> getEventsForOwner(Principal principal) {
        Optional<User> owner = userService.getUserByEmail(principal.getName());
        List<Event.EventItemJSON> resultList = null;
        if (owner.isPresent()) {
            resultList = eventService.getEventsForOwner(owner.get());
        }
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

    @GetMapping("/finished_events")
    ResponseEntity<List<Pair<Event.EventItemJSON, Boolean>>> finishedEvents(Principal principal) {
        Optional<User> owner = userService.getUserByEmail(principal.getName());
        List<Pair<Event.EventItemJSON, Boolean>> eventWithCanBeReviewed = new ArrayList<>();
        List<Event.EventItemJSON> resultList;
        if (owner.isPresent()) {
            resultList = eventService.getFinishedEvents(owner.get());
            resultList.forEach((event) -> {
                Boolean canBeReviewed = reviewService.isReviewOpenForUser(owner.get().getUserID(), event.getEventID());
                Pair<Event.EventItemJSON, Boolean> eventWithReviewFlag = Pair.of(event, canBeReviewed);
                eventWithCanBeReviewed.add(eventWithReviewFlag);
            });
        }
        return new ResponseEntity<>(eventWithCanBeReviewed, HttpStatus.OK);
    }

    @GetMapping("/events_to_review")
    ResponseEntity<List<Event.EventItemJSON>> getEventsToReview(Principal principal){
        List<Event.EventItemJSON> resultList = eventService.getEventsToReview(userService.getUserByEmail(principal.getName()).get());
        return new ResponseEntity<>(resultList, HttpStatus.OK);
    }

}

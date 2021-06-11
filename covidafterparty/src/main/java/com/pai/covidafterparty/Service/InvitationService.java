package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Enums.Activity;
import com.pai.covidafterparty.Enums.Status;
import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Invitation;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InvitationService {
    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    //CREATE
    public Optional<Invitation> addInvitation(Invitation invitation) {
        Optional<Invitation> i = invitationRepository.findInvitationByInvitationID(invitation.getInvitationID());
        if (i.isPresent()) {
            invitationRepository.save(invitation);
            return Optional.of(invitation);
        }
        return Optional.empty();
    }

    //READ
    public Optional<Invitation> getInvitationById(long invitationID) {
        return invitationRepository.findInvitationByInvitationID(invitationID);
    }

    //UPDATE
    public Optional<Invitation> updateInvitation(Invitation invitation) {
        Optional<Invitation> i = invitationRepository.findInvitationByInvitationID(invitation.getInvitationID());
        if (i.isPresent()) {
            invitationRepository.save(invitation);
            return Optional.of(invitation);
        }
        return Optional.empty();
    }

    //DELETE
    public Optional<Invitation> deleteInvitation(long invitationID) {
        Optional<Invitation> i = invitationRepository.findInvitationByInvitationID(invitationID);
        if (i.isPresent()) {
            invitationRepository.delete(i.get());
            return i;
        }
        return Optional.empty();
    }


    public List<Invitation> getInvitations() {
        List<Invitation> returnList = new ArrayList<>();
        invitationRepository.findAll().forEach(i -> returnList.add(i));
        return returnList;
    }

    public List<Invitation.InvitationJSON> getInvitationsForEvent(long eventID) {
        Optional<Event> optEvent = eventService.getEventById(eventID);
        if (optEvent.isPresent()) {
            return invitationRepository.findByEvent(optEvent.get())
                    .stream()
                    .map(i -> i.getInvitationJSON())
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    public Invitation addInvitationFromJSON(Invitation.InvitationJSON invitationJSON) {
        try {
            return invitationRepository.save(new Invitation(
                    invitationJSON.getInvitationID(),
                    userService.getUserById(invitationJSON.getInviterID()).get(),
                    userService.getUserById(invitationJSON.getInvitedID()).get(),
                    eventService.getEventById(invitationJSON.getEventID()).get(),
                    invitationJSON.getStatus()
            ));
        } catch (Exception e) {
            return null;
        }
    }

    public String joinToEvent(String email, long eventID) {
        Optional<Event> optEvent = eventService.getEventById(eventID);
        Optional<User> optUser = userService.getUserByEmail(email);
        if (optEvent.isPresent() && optUser.isPresent()) {
            User user = optUser.get();
            Event event = optEvent.get();

            if (event.getActivity() == Activity.ACTIVE) {
                Status status;
                String returnString = "";
                if (event.isOpenEvent()) {
                    status = Status.ACCEPTED;
                    returnString = "Joined successfully";
                } else {
                    status = Status.PENDING_OWNER;
                    returnString = "Sent request to owner for acceptation";
                }
                Invitation inv = new Invitation(event.getOwner(), user, event, status);
                invitationRepository.save(inv);
                return returnString;
            } else {
                return "Event closed or inactive";
            }
        } else {
            return "No such user or event found";
        }
    }

    public String joinRequest(String email, long eventID, long invitedID) {
        Optional<Event> optEvent = eventService.getEventById(eventID);
        Optional<User> optUser = userService.getUserByEmail(email);
        Optional<User> optInvited = userService.getUserById(invitedID);
        if (optEvent.isPresent() && optUser.isPresent() && optInvited.isPresent()) {
            User user = optUser.get();
            Event event = optEvent.get();
            User invited = optInvited.get();
            if (event.getActivity() == Activity.ACTIVE) {
                if (event.getModerators().contains(user) || event.getOwner() == user) {
                    Invitation inv = new Invitation(event.getOwner(), invited, event, Status.PENDING_USER);
                    invitationRepository.save(inv);
                    return "Invitation sent to user";
                } else {
                    return "You do not have permission for this action";
                }
            } else {
                return "Event closed or inactive";
            }
        } else {
            return "No such user or event found";
        }
    }

    public List<Invitation.InvitationJSON> invPerEvent(long eventID) {
        Optional<Event> optEvent = eventService.getEventById(eventID);
        if (optEvent.isPresent()) {
            return invitationRepository.findByEvent(optEvent.get())
                    .stream()
                    .map(i -> i.getInvitationJSON())
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    public List<Invitation.InvitationJSON> invPerInvited(String email) {
        Optional<User> optInvited = userService.getUserByEmail(email);
        if (optInvited.isPresent()) {
            return invitationRepository.findByInvited(optInvited.get())
                    .stream()
                    .map(i -> i.getInvitationJSON())
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    public List<Invitation.InvitationJSON> invPerInviter(String email) {
        Optional<User> optInvited = userService.getUserByEmail(email);
        if (optInvited.isPresent()) {
            return invitationRepository.findByInviter(optInvited.get())
                    .stream()
                    .map(i -> i.getInvitationJSON())
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }


}

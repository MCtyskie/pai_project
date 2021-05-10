package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Invitation;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InvitationService {
    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;

    //CREATE
    public Optional<Invitation> addInvitation(Invitation invitation){
        Invitation i=invitationRepository.findInvitationByInvitationID(invitation.getInvitationID()).get();
        if(i==null){
            invitationRepository.save(invitation);
            return Optional.of(invitation);
        }
        return Optional.empty();
    }

    //READ
    public Optional<Invitation> getInvitationById(long invitationID){
        Invitation invitation = invitationRepository.findInvitationByInvitationID(invitationID).get();
        return Optional.of(invitation);
    }

    //UPDATE
    public Optional<Invitation> updateInvitation(Invitation invitation){
        Invitation i=invitationRepository.findInvitationByInvitationID(invitation.getInvitationID()).get();
        if(i!=null){
            invitationRepository.save(invitation);
            return Optional.of(invitation);
        }
        return Optional.empty();
    }

    //DELETE
    public Optional<Invitation> deleteInvitation(long invitationID){
        Invitation i=invitationRepository.findInvitationByInvitationID(invitationID).get();
        if(i!=null){
            invitationRepository.delete(i);
            return Optional.of(i);
        }
        return Optional.empty();
    }


    public List<Invitation> getInvitations(){
        List<Invitation> returnList = new ArrayList<>();
        invitationRepository.findAll().forEach(i -> returnList.add(i));
        return returnList;
    }

    public List<Invitation> getInvitationsForEvent(long eventID){
        List<Invitation> returnList = new ArrayList<>();
        Optional<Event> optEvent = eventService.getEventById(eventID);
        if(optEvent.isPresent()){
            return invitationRepository.findByEvent(eventService.getEventById(eventID).get());
        } else {
            return null;
        }
    }

    public Invitation addInvitationFromJSON(Invitation.InvitationJSON invitationJSON){
        try {
            return invitationRepository.save(new Invitation(
                    invitationJSON.getInvitationID(),
                    userService.getUserById(invitationJSON.getInviterID()).get(),
                    userService.getUserById(invitationJSON.getInvitedID()).get(),
                    eventService.getEventById(invitationJSON.getEventID()).get(),
                    invitationJSON.getStatus()
            ));
        } catch (Exception e){
            return null;
        }
    }
}

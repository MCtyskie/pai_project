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
    private EventService eventService;

    public Invitation addInvitation(Invitation invitation){
        return invitationRepository.save(invitation);
    }

    public Optional<Invitation> getInvitationById(long invitationID){
        return invitationRepository.findInvitationByInvitationID(invitationID);
    }

    public Optional<Invitation> updateInvitation(Invitation invitation){
        Invitation i=invitationRepository.findInvitationByInvitationID(invitation.getInvitationID()).orElse(null);
        if(i!=null){
            return Optional.of(invitationRepository.save(invitation));
        }
        return null;
    }

    public String deleteReview(long invitationID){
        Optional<Invitation> selectedInvitation=invitationRepository.findInvitationByInvitationID(invitationID);
        if(selectedInvitation.isPresent()){
            Invitation invitation=selectedInvitation.get();
            String message=String.format("Invitation with id: %d deleted",invitation.getInvitationID());
            invitationRepository.delete(invitation);
            return message;
        }
        return "";
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
}

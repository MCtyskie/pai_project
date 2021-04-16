package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.Invitation;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InvitationService {
    @Autowired
    private InvitationRepository invitationRepository;

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
}

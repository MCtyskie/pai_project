package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.Invitation;
import com.pai.covidafterparty.Service.EventService;
import com.pai.covidafterparty.Service.InvitationService;
import com.pai.covidafterparty.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/invitation")
public class InvitationController {
    @Autowired
    private InvitationService invitationService;
    @Autowired
    private UserService userService;
    @Autowired
    private EventService eventService;

    @GetMapping("/invitations")
    ResponseEntity<List<Invitation>> getInvitations(){
        return new ResponseEntity<>(invitationService.getInvitations(), HttpStatus.OK);
    }

    @GetMapping("/invitations")
    ResponseEntity<List<Invitation>> getInvitationForEvent(@RequestParam long eventID){
        return new ResponseEntity<>(invitationService.getInvitationsForEvent(eventID), HttpStatus.OK);
    }

    @PostMapping("/add")
    ResponseEntity<String> addInvitation(@RequestBody Invitation.InvitationJSON invitationJSON){
        if(invitationService.addInvitationFromJSON(invitationJSON) != null){
            return new ResponseEntity<>("Invitation added", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/update")
    ResponseEntity<String> updateInvitation(Principal principal, @RequestBody Invitation.InvitationJSON invitationJSON){
        Optional<Invitation> invitationOptional = invitationService.getInvitationById(invitationJSON.getInvitationID());
        if(invitationOptional.isPresent()){
            Invitation invitation = invitationOptional.get();
            try {
                invitation.setInvited(userService.getUserById(invitationJSON.getInvitedID()).get());
                invitation.setInviter(userService.getUserById(invitationJSON.getInviterID()).get());
                invitation.setEvent(eventService.getEventById(invitationJSON.getEventID()).get());
            } catch (Exception e){
                return new ResponseEntity<>("Given User of Event ID not found", HttpStatus.NOT_FOUND);
            }
            invitation.setStatus(invitationJSON.getStatus());

            if(invitationService.updateInvitation(invitation).isPresent()){
                return new ResponseEntity<>("Invitation updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invitation not updated", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Invitation not founf", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete")
    ResponseEntity<String> deleteInvitation(Principal principal, @RequestParam long invitationID){
        if(invitationService.deleteInvitation(invitationID).isPresent()){
            return new ResponseEntity<>("Invitation deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Invitation not found", HttpStatus.NOT_FOUND);
        }
    }


}

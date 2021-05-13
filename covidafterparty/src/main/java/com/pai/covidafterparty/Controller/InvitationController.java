package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.Invitation;
import com.pai.covidafterparty.Service.InvitationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/invitation")
public class InvitationController {
    @Autowired
    InvitationService invitationService;

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



}

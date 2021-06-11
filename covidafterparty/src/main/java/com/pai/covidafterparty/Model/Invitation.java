package com.pai.covidafterparty.Model;

import com.pai.covidafterparty.Enums.Status;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invitation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long invitationID;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "inviter_user_id", referencedColumnName = "userID")
    private User inviter;

    @ManyToOne
    @JoinColumn(name="invited_user_id", nullable=false)
    private User invited;

    @ManyToOne
    @JoinColumn(name="event_id", nullable=false)
    private Event event;

    private Status status;

    public Invitation(User inviter, User invited, Event event, Status status) {
        this.inviter = inviter;
        this.invited = invited;
        this.event = event;
        this.status = status;
    }

    public InvitationJSON getInvitationJSON(){
        return new InvitationJSON(invitationID, inviter, invited, event.getEventID(), status);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class InvitationJSON{
        private long invitationID;
        private long inviterID;
        private String inviterName;
        private long invitedID;
        private String invitedName;
        private long eventID;
        private Status status;

        public InvitationJSON(long invitationID, User inviter, User invited, long eventID, Status status) {
            this.invitationID = invitationID;
            this.inviterID = inviter.getUserID();
            this.invitedID = invited.getUserID();
            this.invitedName = invited.getName() + " " + invited.getLastName();
            this.inviterName = inviter.getName() + " " + inviter.getLastName();
            this.eventID = eventID;
            this.status = status;
        }
    }
}

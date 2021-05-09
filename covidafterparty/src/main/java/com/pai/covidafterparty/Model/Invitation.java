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
        return new InvitationJSON(invitationID, inviter.getUserID(), invited.getUserID(), event.getEventID(), status);
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public class InvitationJSON{
        private long invitationID;
        private long inviterID;
        private long invitedID;
        private long eventID;
        private Status status;

        public InvitationJSON(long invitationID, long inviterID, long invitedID, long eventID, Status status) {
            this.invitationID = invitationID;
            this.inviterID = inviterID;
            this.invitedID = invitedID;
            this.eventID = eventID;
            this.status = status;
        }
    }
}

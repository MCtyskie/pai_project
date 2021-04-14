package com.pai.covidafterparty.Model;

import com.pai.covidafterparty.Enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
}

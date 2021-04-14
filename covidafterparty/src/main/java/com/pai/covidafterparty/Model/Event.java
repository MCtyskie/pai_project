package com.pai.covidafterparty.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pai.covidafterparty.Enums.Activity;
import com.pai.covidafterparty.Enums.Visibility;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long eventID;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable=false)
    private User owner;

    @ManyToMany
    @JoinTable(
            name = "event_moderators",
            joinColumns = @JoinColumn(name = "event_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    @JsonIgnore
    private List<User> moderators;
    private String title;

    /*
    Localization
     */
    private String city;
    private String postNumber;
    private String street;
    private String houseNumber;
    private String apartmentNumber;

    private LocalDateTime eventDate;
    private LocalDateTime publishDate;
    private Activity activity;
    private Visibility visibility;
    private String tags;
    private int maxGuests;
    private String description;
    private String images;
    private int ageRestriction;
    private boolean openEvent;

    @OneToMany(mappedBy = "event")
    private List<Invitation> invitations;

    @OneToMany(mappedBy = "event")
    private List<Review> reviews;
}

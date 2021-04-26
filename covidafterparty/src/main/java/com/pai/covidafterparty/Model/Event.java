package com.pai.covidafterparty.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pai.covidafterparty.Enums.Activity;
import com.pai.covidafterparty.Enums.Visibility;
import lombok.*;

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

    public Event(User owner, String title, String city, String postNumber, String street,
                 String houseNumber, String apartmentNumber, LocalDateTime eventDate,
                 Activity activity, Visibility visibility, String tags, int maxGuests,
                 String description, String images, int ageRestriction, boolean openEvent) {
        this.owner = owner;
        this.title = title;
        this.city = city;
        this.postNumber = postNumber;
        this.street = street;
        this.houseNumber = houseNumber;
        this.apartmentNumber = apartmentNumber;
        this.eventDate = eventDate;
        this.activity = activity;
        this.visibility = visibility;
        this.tags = tags;
        this.maxGuests = maxGuests;
        this.description = description;
        this.images = images;
        this.ageRestriction = ageRestriction;
        this.openEvent = openEvent;
    }

    @OneToMany(mappedBy = "event")
    private List<Invitation> invitations;

    @OneToMany(mappedBy = "event")
    private List<Review> reviews;

    public EventItemJSON getEvenItemJSON(){
        return new EventItemJSON(title, eventDate, city, postNumber, street, houseNumber, apartmentNumber, ageRestriction, maxGuests, tags, images);
    }

    public EventDetailsJSON getEvenDetailsJSON(){
        return new EventDetailsJSON(title, eventDate, city, postNumber, street, houseNumber, apartmentNumber, ageRestriction, maxGuests, tags, images, activity, visibility, openEvent);
    }

    @Getter
    @Setter
    public static class EventItemJSON{
        private String title;
        private LocalDateTime eventDate;

        private String city;
        private String postNumber;
        private String street;
        private String houseNumber;
        private String apartmentNumber;

        private int ageRestriction;
        private int maxGuests;
        private String tags;

        private String images;

        public EventItemJSON(String title, LocalDateTime eventDate, String city, String postNumber, String street, String houseNumber, String apartmentNumber, int ageRestriction, int maxGuests, String tags, String images) {
            this.title = title;
            this.eventDate = eventDate;
            this.city = city;
            this.postNumber = postNumber;
            this.street = street;
            this.houseNumber = houseNumber;
            this.apartmentNumber = apartmentNumber;
            this.ageRestriction = ageRestriction;
            this.maxGuests = maxGuests;
            this.tags = tags;
            this.images = images;
        }

        public EventItemJSON(){
            this.title = null;
            this.eventDate = null;
            this.city = null;
            this.postNumber = null;
            this.street = null;
            this.houseNumber = null;
            this.apartmentNumber = null;
            this.ageRestriction = -1;
            this.maxGuests = -1;
            this.tags = null;
            this.images = null;
        }
    }

    @Getter
    @Setter
    public static class EventDetailsJSON extends EventItemJSON{
        private Activity activity;
        private Visibility visibility;
        private boolean openEvent;

        public EventDetailsJSON(String title, LocalDateTime eventDate, String city, String postNumber, String street, String houseNumber, String apartmentNumber, int ageRestriction, int maxGuests, String tags, String images, Activity activity, Visibility visibility, boolean openEvent) {
            super(title, eventDate, city, postNumber, street, houseNumber, apartmentNumber, ageRestriction, maxGuests, tags, images);
            this.activity = activity;
            this.visibility = visibility;
            this.openEvent = openEvent;
        }

        public EventDetailsJSON() {
            super();
            this.activity = null;
            this.visibility = null;
        }
    }
}

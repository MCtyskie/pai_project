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
    @JoinColumn(name = "owner_id", nullable = false)
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
    private String apartmentNumber;

    private LocalDateTime eventDate;
    private LocalDateTime publishDate;
    private Activity activity;
    private Visibility visibility;
    private String tags;
    private int maxGuests;
    private String description;
    private String images;
    private boolean ageRestriction;
    private boolean openEvent;

    public Event(User owner, String title, String city, String postNumber, String street, String apartmentNumber,
                 LocalDateTime eventDate, Activity activity, Visibility visibility, String tags, int maxGuests,
                 String description, String images, boolean ageRestriction, boolean openEvent) {
        this.owner = owner;
        this.title = title;
        this.city = city;
        this.postNumber = postNumber;
        this.street = street;
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

    public EventItemJSON getEvenItemJSON() {
        return new EventItemJSON(eventID, title, eventDate, city, postNumber, street, apartmentNumber, ageRestriction, maxGuests, tags, description, images);
    }

    public EventDetailsJSON getEvenDetailsJSON() {
        return new EventDetailsJSON(eventID, title, eventDate, city, postNumber, street, apartmentNumber, ageRestriction, maxGuests, tags, description, images, activity, visibility, openEvent);
    }

    @Getter
    @Setter
    public static class EventItemJSON {
        private long eventID;
        private String title;
        private LocalDateTime eventDate;

        private String city;
        private String postNumber;
        private String street;
        private String apartmentNumber;

        private boolean ageRestriction;
        private int maxGuests;
        private String tags;
        private String description;

        private String images;

        public EventItemJSON(long eventID, String title, LocalDateTime eventDate, String city, String postNumber, String street, String apartmentNumber, boolean ageRestriction, int maxGuests, String tags, String description, String images) {
            this.eventID = eventID;
            this.title = title;
            this.eventDate = eventDate;
            this.city = city;
            this.postNumber = postNumber;
            this.street = street;
            this.apartmentNumber = apartmentNumber;
            this.ageRestriction = ageRestriction;
            this.maxGuests = maxGuests;
            this.tags = tags;
            this.description = description;
            this.images = images;
        }

        public EventItemJSON() {
            this.title = null;
            this.eventDate = null;
            this.city = null;
            this.postNumber = null;
            this.street = null;
            this.apartmentNumber = null;
            this.ageRestriction = false;
            this.maxGuests = -1;
            this.tags = null;
            this.images = null;
        }
    }

    @Getter
    @Setter
    public static class EventDetailsJSON extends EventItemJSON {
        private Activity activity;
        private Visibility visibility;
        private boolean openEvent;

        public EventDetailsJSON(long eventID, String title, LocalDateTime eventDate, String city, String postNumber, String street, String apartmentNumber, boolean ageRestriction, int maxGuests, String tags, String description, String images, Activity activity, Visibility visibility, boolean openEvent) {
            super(eventID, title, eventDate, city, postNumber, street, apartmentNumber, ageRestriction, maxGuests, tags, description, images);
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

package com.pai.covidafterparty.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userID;
    private String name;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
    private LocalDate birthdate;
    private String city;
    private String phone;
    private boolean activeAccount;

    @JsonIgnore
    @OneToMany(mappedBy = "owner")
    private List<Event> ownedEvents;

    @JsonIgnore
    @OneToOne(mappedBy = "inviter")
    private Invitation invitationSent;

    @JsonIgnore
    @OneToMany(mappedBy = "invited")
    private List<Invitation> invitationsReceived;

    @ManyToMany(mappedBy = "moderators")
    @JsonIgnore
    private List<Event> moderating;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_to_roles",
            joinColumns = @JoinColumn(name = "userID"),
            inverseJoinColumns = @JoinColumn(name = "roleID"))
    private Set<Role> roles = new HashSet<>();

    @JsonIgnore
    @OneToMany(mappedBy = "reviewer")
    private List<Review> reviews;

    public User(String name, String lastName, String email, String password, LocalDate birthdate, String city, String phone) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.city = city;
        this.phone = phone;
    }

    @JsonIgnore
    public UserProfileJSON getUserProfileJSON() {
        return new UserProfileJSON(name, lastName, email, city, phone, userID);
    }

    @JsonIgnore
    public UserFullJSON getUserFullJSON() {
        return new UserFullJSON(userID, name, lastName, email, password, birthdate, city, phone, activeAccount);
    }

    @Getter
    @Setter
    public static class UserFullJSON {
        private long userID;
        private String name;
        private String lastName;
        private String email;
        private String password;
        private LocalDate birthdate;
        private String city;
        private String phone;
        private boolean activeAccount;

        public UserFullJSON(long userID, String name, String lastName, String email, String password, LocalDate birthdate, String city, String phone, boolean activeAccount) {
            this.userID = userID;
            this.name = name;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.birthdate = birthdate;
            this.city = city;
            this.phone = phone;
            this.activeAccount = activeAccount;
        }

        public UserFullJSON() {
            this.userID = -1;
            this.name = null;
            this.lastName = null;
            this.email = null;
            this.city = null;
            this.phone = null;
            this.password = null;
            this.birthdate = null;
            this.activeAccount = false;
        }
    }

    @Getter
    @Setter
    public static class UserProfileJSON {
        private long userID;
        private String name;
        private String lastName;
        private String email;
        private String city;
        private String phone;

        public UserProfileJSON(String name, String lastName, String email, String city, String phone, long userID) {
            this.userID = userID;
            this.name = name;
            this.lastName = lastName;
            this.email = email;
            this.city = city;
            this.phone = phone;
        }

        public UserProfileJSON() {
            this.name = null;
            this.lastName = null;
            this.email = null;
            this.city = null;
            this.phone = null;
        }
    }

}
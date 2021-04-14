package com.pai.covidafterparty.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String password;
    private LocalDate birthdate;
    private String city;
    private String phone;
    private boolean activeAccount;

    @OneToMany(mappedBy = "owner")
    private List<Event> ownedEvents;

    @OneToOne(mappedBy = "inviter")
    private Invitation invitationSent;

    @OneToMany(mappedBy = "invited")
    private List<Invitation> invitationsReceived;

    @ManyToMany(mappedBy = "moderators")
    @JsonIgnore
    private List<Event> moderating;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name="users_to_roles",
            joinColumns = @JoinColumn(name="userID"),
            inverseJoinColumns = @JoinColumn(name="roleID"))
    private Set<Role> roles=new HashSet<>();

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
}
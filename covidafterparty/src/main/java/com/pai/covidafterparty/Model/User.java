package com.pai.covidafterparty.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    @ManyToMany(mappedBy = "moderators")
    @JsonIgnore
    private List<Event> moderating;

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
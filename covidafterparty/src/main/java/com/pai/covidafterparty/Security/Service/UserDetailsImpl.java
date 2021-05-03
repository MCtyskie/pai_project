package com.pai.covidafterparty.Security.Service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.pai.covidafterparty.Model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID=1L;
    private Long userID;
    private String name;
    private String lastName;
    private String email;
    @JsonIgnore
    private String password;
    private LocalDate birthDate;
    private String city;
    private String phone;
    private Collection<? extends GrantedAuthority>authorities;

    public UserDetailsImpl(Long userID, String name, String lastName, String email, String password,
                           LocalDate birthDate, String city, String phone,
                           Collection<? extends GrantedAuthority> authorities) {
        this.userID = userID;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
        this.city = city;
        this.phone = phone;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user){
        List<GrantedAuthority> authorities=user.getRoles().stream()
                .map(role->new SimpleGrantedAuthority(role.getUserRole()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getUserID(),
                user.getName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.getBirthdate(),
                user.getCity(),
                user.getPhone(),
                authorities
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Long getUserID(){
        return userID;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public String getCity() {
        return city;
    }

    public String getPhone() {
        return phone;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserDetailsImpl user = (UserDetailsImpl)o;

        return Objects.equals(userID,user.userID);
    }
}

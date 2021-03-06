package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    //CREATE
    public Optional<User> addUser(User user) {
        User u = userRepository.findUserByEmail(user.getEmail()).get();
        if (u == null) {
            userRepository.save(user);
            return Optional.of(user);
        }
        return Optional.empty();
    }

    //READ
    public Optional<User> getUserById(long userID) {
        return userRepository.findUserByUserID(userID);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    //UPDATE
    public Optional<User> updateUser(User user) {
        Optional<User> u = userRepository.findUserByEmail(user.getEmail());
        if (u.isPresent()) {
            userRepository.save(user);
            return Optional.of(user);
        }
        return Optional.empty();
    }

    //DELETE
    public Optional<User> deleteUser(long userID) {
        Optional<User> u = userRepository.findUserByUserID(userID);
        if (u.isPresent()) {
            userRepository.delete(u.get());
            return u;
        }
        return Optional.empty();
    }

    public User.UserProfileJSON getUserProfileJSON(long id) {
        Optional<User> user = userRepository.findUserByUserID(id);
        if (user.isPresent()) return user.get().getUserProfileJSON();
        else return null;
    }

    public User.UserProfileJSON getUserProfileJSONbyEmail(String email) {
        Optional<User> user = userRepository.findUserByEmail(email);
        if (user.isPresent()) return user.get().getUserProfileJSON();
        else return null;
    }

    public List<User> getUsers() {
        List<User> list = (List<User>) userRepository.findAll();
        return list;
    }


}

package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User addUser(User user){
        User u=userRepository.findUserByEmail(user.getEmail()).orElse(null);
        if(u==null){
            return userRepository.save(user);
        }
        return null;
    }

    public Optional<User> getUserById(long userID){
        return userRepository.findUserByUserID(userID);
    }
    public Optional<User> getUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }

    public Optional<User> updateUser(User user){
        User u=userRepository.findUserByEmail(user.getEmail()).orElse(null);
        if(u!=null){
            return Optional.of(userRepository.save(user));
        }
        return null;
    }

    public String deleteUser(long userID){
        Optional<User> selectedUser=userRepository.findUserByUserID(userID);
        if(selectedUser.isPresent()){
            User user=selectedUser.get();
            String message=String.format("User with id: %d deleted",user.getUserID());
            userRepository.delete(user);
            return message;
        }
        return "";
    }

}

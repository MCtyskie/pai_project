package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    /*
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
     */
    public boolean addUser(User user){
        User u=userRepository.findUserByEmail(user.getEmail()).get();
        if(u==null){
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean getUserById(long userID){
        if(userRepository.findUserByUserID(userID).isPresent()){
            return true;
        }
        return false;
    }

    public boolean getUserByEmail(String email){
        if(userRepository.findUserByEmail(email).isPresent()){
            return true;
        }
        return false;
    }

    public boolean updateUser(User user){
        User u=userRepository.findUserByEmail(user.getEmail()).get();
        if(u!=null){
            userRepository.save(user);
            return true;
        }
        return false;
    }
    public boolean deleteUser(long userID){
        User u=userRepository.findUserByUserID(userID).get();
        if(u!=null){
            userRepository.delete(u);
            return true;
        }
        return false;
    }
}

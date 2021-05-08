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

    public Optional<User> getUserById(long userID){
        Optional<User> user = userRepository.findUserByUserID(userID);
        return user;
    }

    public Optional<User> getUserByEmail(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        return user;
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

    public User.UserProfileJSON getUserProfileJSON(long id){
        Optional<User> user = userRepository.findUserByUserID(id);
        if(user.isPresent()) return user.get().getUserProfileJSON();
        else return null;
    }

    public User.UserProfileJSON getUserProfileJSONbyEmail(String email){
        Optional<User> user = userRepository.findUserByEmail(email);
        if(user.isPresent()) return user.get().getUserProfileJSON();
        else return null;
    }

    public List<User> getUsers(){
        List<User> list = (List<User>) userRepository.findAll();
        return list;
    }


}

package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    ResponseEntity<String> createUser(User user){
        boolean val=userService.addUser(user);
        if(val){
            return new ResponseEntity<>("User saved correctly", HttpStatus.OK);
        }
        return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/user/profile")
    ResponseEntity<User.UserProfileJSON> getUserProfileInfo(@RequestParam long id){
        User.UserProfileJSON userJSON = userService.getUserProfileJSON(id);
        ResponseEntity<User.UserProfileJSON> respond;
        if(userJSON != null) return new ResponseEntity<User.UserProfileJSON>(userJSON, HttpStatus.OK);
        return new ResponseEntity<User.UserProfileJSON>(new User.UserProfileJSON(), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/user/edit")
    ResponseEntity<String> editUser(@RequestBody User.UserProfileJSON userJSON){
        Optional<User> userOptional = userService.getUserById(userJSON.getUserID());
        if(userOptional.isPresent()){
            try {
                User user = userOptional.get();
                user.setName(userJSON.getLastName());
                user.setEmail(userJSON.getEmail());
                user.setCity(userJSON.getCity());
                user.setPhone(userJSON.getPhone());
                userService.updateUser(user);
                return new ResponseEntity<String>("User edited", HttpStatus.OK);
            } catch(Exception e){
                return new ResponseEntity<String>("Bad request", HttpStatus.BAD_REQUEST);
            }
        }
        else return new ResponseEntity<String>("Bad request", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/user/delete")
    ResponseEntity<String> deleteUser(@RequestParam long userID){
        if(userService.deleteUser(userID)){
            return new ResponseEntity<String>("User with ID: "+userID+" deleted succesfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>("User not found", HttpStatus.NOT_FOUND);
        }
    }
}

/*
public ResponseEntity<String> addUser(User user){
        User u=userRepository.findUserByEmail(user.getEmail()).get();
        if(u==null){
            userRepository.save(user);
            return new ResponseEntity<>("User saved correctly", HttpStatus.OK);
        }
        return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
    }

    public ResponseEntity<String> getUserById(long userID) {
        if(userRepository.findUserByUserID(userID).isPresent()){
            return new ResponseEntity<>("User found",HttpStatus.OK);
        }
        return new ResponseEntity<>("User doesn't exist",HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> getUserByEmail(String email){
        if(userRepository.findUserByEmail(email).isPresent()){
            return new ResponseEntity<>("User found",HttpStatus.OK);
        }
        return new ResponseEntity<>("User doesn't exist",HttpStatus.NOT_FOUND);
    }

    public ResponseEntity<String> updateUser(User user){
        User u=userRepository.findUserByEmail(user.getEmail()).get();
        if(u==null){
            userRepository.delete(user);
            return new ResponseEntity<>("User updated correctly", HttpStatus.OK);
        }
        return new ResponseEntity<>("User doesn't exist", HttpStatus.NOT_ACCEPTABLE);
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
 */
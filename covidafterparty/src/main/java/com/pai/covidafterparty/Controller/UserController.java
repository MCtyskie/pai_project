package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.Role;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    ResponseEntity<String> createUser(User user){
        if(Optional.of(userService.addUser(user)).get().isPresent()){
            return new ResponseEntity<>("User saved correctly", HttpStatus.OK);
        }
        return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/profile")
    ResponseEntity<User.UserProfileJSON> getUserProfile(Principal principal){
        User.UserProfileJSON userJSON = userService.getUserProfileJSONbyEmail(principal.getName());
        if(userJSON != null) return new ResponseEntity<>(userJSON, HttpStatus.OK);
        return new ResponseEntity<>(new User.UserProfileJSON(), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/edit")
    ResponseEntity<String> editUser(Principal principal, @RequestBody User.UserProfileJSON userJSON){
        Optional<User> userOptional = userService.getUserByEmail(principal.getName());
        if(userOptional.isPresent()){
            try {
                User user = userOptional.get();
                user.setName(userJSON.getLastName());
                user.setEmail(userJSON.getEmail());
                user.setCity(userJSON.getCity());
                user.setPhone(userJSON.getPhone());
                userService.updateUser(user);
                return new ResponseEntity<>("User edited", HttpStatus.OK);
            } catch(Exception e){
                return new ResponseEntity<>("Bad request", HttpStatus.BAD_REQUEST);
            }
        }
        else return new ResponseEntity<>("Bad request", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete")
    ResponseEntity<String> deleteUser(Principal principal, @RequestParam long userID){
        if(Optional.of(userService.deleteUser(userService.getUserByEmail(principal.getName()).get().getUserID())).get().isPresent()){
            return new ResponseEntity<>("User with ID: " + userID + " deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users")
    ResponseEntity<List<User>> getUserProfiles(Principal principal){
        User user = userService.getUserByEmail(principal.getName()).get();
        if(user.getRoles().stream().anyMatch(r -> r.getUserRole().equals("ROLE_ADMIN"))) {
            List<User> usersList = userService.getUsers();
            if (!usersList.isEmpty()) return new ResponseEntity<>(usersList, HttpStatus.OK);
            return new ResponseEntity<>(usersList, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
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
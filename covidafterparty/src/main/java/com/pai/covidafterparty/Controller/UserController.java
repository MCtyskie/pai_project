package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.Role;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public UserController(UserService userService) {
        this.userService = userService;
    }

    ResponseEntity<String> createUser(User user) {
        if (Optional.of(userService.addUser(user)).get().isPresent()) {
            return new ResponseEntity<>("User saved correctly", HttpStatus.OK);
        }
        return new ResponseEntity<>("User already exists", HttpStatus.NOT_ACCEPTABLE);
    }

    @GetMapping("/profile")
    ResponseEntity<User.UserProfileJSON> getUserProfile(Principal principal) {
        User.UserProfileJSON userJSON = userService.getUserProfileJSONbyEmail(principal.getName());
        if (userJSON != null) return new ResponseEntity<>(userJSON, HttpStatus.OK);
        return new ResponseEntity<>(new User.UserProfileJSON(), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/edit")
    ResponseEntity<String> editUser(Principal principal, @RequestBody User.UserProfileJSON userJSON) {
        Optional<User> userOptional = userService.getUserByEmail(principal.getName());
        if (userOptional.isPresent()) {
            try {
                User user = userOptional.get();
                user.setName(userJSON.getLastName());
                user.setEmail(userJSON.getEmail());
                user.setCity(userJSON.getCity());
                user.setPhone(userJSON.getPhone());
                userService.updateUser(user);
                return new ResponseEntity<>("User edited", HttpStatus.OK);
            } catch (Exception e) {
                return new ResponseEntity<>("Bad request", HttpStatus.BAD_REQUEST);
            }
        } else return new ResponseEntity<>("Bad request", HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("/delete")
    ResponseEntity<String> deleteUser(Principal principal, @RequestParam long userID) {
        if (Optional.of(userService.deleteUser(userService.getUserByEmail(principal.getName()).get().getUserID())).get().isPresent()) {
            return new ResponseEntity<>("User with ID: " + userID + " deleted successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<List<User>> getUserProfiles(Principal principal) {
        Optional<User> user = userService.getUserByEmail(principal.getName());
        if (user.isPresent()) {
            List<User> usersList = userService.getUsers();
            if (!usersList.isEmpty()) return new ResponseEntity<>(usersList, HttpStatus.OK);
            return new ResponseEntity<>(usersList, HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/create_user")//ZMIENIONE
    ResponseEntity<String> createUser(Principal principal, @RequestBody User.UserFullJSON userFullJSON) {
        User user = new User(
                userFullJSON.getName(),
                userFullJSON.getLastName(),
                userFullJSON.getEmail(),
                userFullJSON.getPassword(),
                userFullJSON.getBirthdate(),
                userFullJSON.getCity(),
                userFullJSON.getPhone());
        if (userService.addUser(user).isEmpty()) {
            return new ResponseEntity<>("User already exist", HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>("User added", HttpStatus.OK);
        }
    }

    @GetMapping("/get_user_by_id")//ZMIENIONE
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<User.UserFullJSON> getUserByID(@RequestParam long userID) {
        Optional<User> user = userService.getUserById(userID);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get().getUserFullJSON(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new User.UserFullJSON(), HttpStatus.NOT_FOUND);
        }
    }
}
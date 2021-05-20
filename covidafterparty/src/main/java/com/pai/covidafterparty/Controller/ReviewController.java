package com.pai.covidafterparty.Controller;

import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Service.EventService;
import com.pai.covidafterparty.Service.ReviewService;
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

@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;
    @Autowired
    private UserService userService;
    @Autowired
    private EventService eventService;



    @PostMapping("/addReview")
    ResponseEntity<String> addReview(Principal principal, @RequestBody Review.ReviewJSON reviewJSON){
        try {
            Review review = new Review(
                    userService.getUserById(reviewJSON.getUserID()).get(),
                    eventService.getEventById(reviewJSON.getEventID()).get(),
                    reviewJSON.getRate(),
                    reviewJSON.getDescription()
            );
            if (reviewService.addReview(review).isPresent()) {
                return new ResponseEntity<>("Review added", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Review not added", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e){
            return new ResponseEntity<>("Review not added", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getReviews")
    ResponseEntity<List<Review.ReviewJSON>> getReviewsForUser(Principal principal){
        Optional<User> user = userService.getUserByEmail(principal.getName());
        if(user.isPresent()){
            List<Review.ReviewJSON> list = reviewService.getReviewsForUser(user.get());
            return new ResponseEntity<>(list, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/getReviewByID")
    @PreAuthorize("hasRole('ADMIN')")
    ResponseEntity<Review.ReviewJSON> getReviewByID(@RequestParam long reviewID){
        Optional<Review> review = reviewService.getReviewById(reviewID);
        if(review.isPresent()){
            return new ResponseEntity<>(review.get().getReviewJSON(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new Review.ReviewJSON(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/update")
    ResponseEntity<String> updateReview(Principal principal, @RequestBody Review.ReviewJSON reviewJSON){
        Optional<Review> optionalReview = reviewService.getReviewById(reviewJSON.getReviewID());
        if(optionalReview.isPresent()){
            Review review = optionalReview.get();
            try {
                review.setReviewer(userService.getUserById(reviewJSON.getUserID()).get());
                review.setEvent(eventService.getEventById(reviewJSON.getEventID()).get());
            } catch (Exception e){
                return new ResponseEntity<>("No such User or Event ID found", HttpStatus.NOT_FOUND);
            }
            review.setRate(reviewJSON.getRate());
            review.setDescription(reviewJSON.getDescription());
            if(reviewService.updateReview(review).isPresent()){
                return new ResponseEntity<>("Review updated", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Review not updated", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Review not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete")
    ResponseEntity<String> deleteReview(Principal principal, @RequestParam long reviewID){
        if(reviewService.deleteReview(reviewID).isPresent()){
            return new ResponseEntity<>("Review deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Review not deleted", HttpStatus.NOT_FOUND);
        }
    }


}

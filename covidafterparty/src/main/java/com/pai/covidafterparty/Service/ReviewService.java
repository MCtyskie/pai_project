package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Enums.Activity;
import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.EventRepository;
import com.pai.covidafterparty.Repository.InvitationRepository;
import com.pai.covidafterparty.Repository.ReviewRepository;
import com.pai.covidafterparty.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private InvitationRepository invitationRepository;

    //CREATE
    public Optional<Review> addReview(Review review) {
        Optional<Review> r = reviewRepository.findReviewByReviewID(review.getReviewID());
        if (r.isEmpty()) {
            reviewRepository.save(review);
            return Optional.of(review);
        }
        return Optional.empty();
    }

    //READ
    public Optional<Review> getReviewById(long reviewID) {
        return reviewRepository.findReviewByReviewID(reviewID);
    }

    //UPDATE
    public Optional<Review> updateReview(Review review) {
        Optional<Review> r = reviewRepository.findReviewByReviewID(review.getReviewID());
        if (r.isPresent()) {
            reviewRepository.save(review);
            return Optional.of(review);
        }
        return Optional.empty();
    }

    //DELETE
    public Optional<Review> deleteReview(long reviewID) {
        Optional<Review> r = reviewRepository.findReviewByReviewID(reviewID);
        if (r.isPresent()) {
            reviewRepository.delete(r.get());
            return r;
        }
        return Optional.empty();
    }

    public List<Review.ReviewJSON> getReviewsForUser(User user) {
        List<Review> list = reviewRepository.findByReviewer(user);
        return list.stream().map(r -> r.getReviewJSON())
                .collect(Collectors.toList());
    }

    public List<Review.ReviewJSON> getReviewForEvent(long eventID) {
        Optional<Event> event = eventRepository.findEventByEventID(eventID);
        if (event.isPresent()) {
            return reviewRepository.findByEvent(event.get())
                    .stream()
                    .map(r -> r.getReviewJSON())
                    .collect(Collectors.toList());
        } else {
            return new ArrayList<>();
        }
    }

    public boolean isReviewOpenForUser(long userID, long eventID) {
        Optional<Event> optEvent = eventRepository.findEventByEventID(eventID);
        if (optEvent.isPresent()) {
            Event event = optEvent.get();
            boolean isUserInvited = invitationRepository.findByEvent(event).stream()
                    .anyMatch(i -> i.getInvited().getUserID() == userID);
            boolean isEventCompleted = event.getActivity() == Activity.COMPLETED;
            boolean isEventReviewed = reviewRepository.findByEvent(event)
                    .stream()
                    .anyMatch(r -> r.getReviewer().getUserID() == userID);
            return (isEventCompleted && !isEventReviewed && isUserInvited);
        } else {
            return false;
        }
    }


}

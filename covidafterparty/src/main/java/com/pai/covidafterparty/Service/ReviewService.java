package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    public Review addEvent(Review review){
        return reviewRepository.save(review);
    }

    public Optional<Review> getReviewById(long reviewID){
        return reviewRepository.findReviewByReviewID(reviewID);
    }

    public Optional<Review> updateEvent(Review review){
        Review r=reviewRepository.findReviewByReviewID(review.getReviewID()).orElse(null);
        if(r!=null){
            return Optional.of(reviewRepository.save(review));
        }
        return null;
    }

    public String deleteReview(long reviewID){
        Optional<Review> selectedReview=reviewRepository.findReviewByReviewID(reviewID);
        if(selectedReview.isPresent()){
            Review review=selectedReview.get();
            String message=String.format("Review with id: %d deleted",review.getReviewID());
            reviewRepository.delete(review);
            return message;
        }
        return "";
    }

}

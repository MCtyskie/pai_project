package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;

    //CREATE
    public Optional<Review> addReview(Review review){
        Review r=reviewRepository.findReviewByReviewID(review.getReviewID()).get();
        if(r==null){
            reviewRepository.save(review);
            return Optional.of(review);
        }
        return Optional.empty();
    }

    //READ
    public Optional<Review> getReviewById(long reviewID){
        Review review = reviewRepository.findReviewByReviewID(reviewID).get();
        return Optional.of(review);
    }

    //UPDATE
    public Optional<Review> updateUser(Review review){
        Review r=reviewRepository.findReviewByReviewID(review.getReviewID()).get();
        if(r!=null){
            reviewRepository.save(review);
            return Optional.of(review);
        }
        return Optional.empty();
    }

    //DELETE
    public Optional<Review> deleteReview(long reviewID){
        Review r=reviewRepository.findReviewByReviewID(reviewID).get();
        if(r!=null){
            reviewRepository.delete(r);
            return Optional.of(r);
        }
        return Optional.empty();
    }


}

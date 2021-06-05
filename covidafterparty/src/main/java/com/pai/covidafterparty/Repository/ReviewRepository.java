package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends CrudRepository<Review, Long> {
    public Optional<Review> findReviewByReviewID(long reviewID);

    public List<Review> findByReviewer(User reviewer);

    public List<Review> findByEvent(Event event);
}

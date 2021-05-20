package com.pai.covidafterparty.Model;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewID;

    @ManyToOne
    @JoinColumn(name="reviewer_id", nullable=false)
    private User reviewer;

    @ManyToOne
    @JoinColumn(name="event_id", nullable=false)
    private Event event;

    private int rate;
    private String description;

    public ReviewJSON getReviewJSON(){
        return new ReviewJSON(reviewID, reviewer.getUserID(), event.getEventID(), rate, description);
    }

    public Review(User reviewer, Event event, int rate, String description){
        this.reviewer = reviewer;
        this.event = event;
        this.rate = rate;
        this.description = description;
    }

    @Getter
    @Setter
    public static class ReviewJSON{
        private long reviewID;
        private long userID;
        private long eventID;
        private int rate;
        private String description;

        public ReviewJSON(long reviewID, long userID, long eventID, int rate, String description) {
            this.reviewID = reviewID;
            this.userID = userID;
            this.eventID = eventID;
            this.rate = rate;
            this.description = description;
        }

        public ReviewJSON() {
        }
    }

}

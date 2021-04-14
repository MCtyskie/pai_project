package com.pai.covidafterparty.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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

}

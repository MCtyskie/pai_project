package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, Long> {
    public Optional<Event> findEventByEventID(long eventID);

    @Query(value = "SELECT * FROM event e " +
            "WHERE e.eventid IN " +
            "(SELECT invitation.event_id FROM invitation WHERE invitation.invited_user_id=?1 AND invitation.status = 0) " +
            "AND e.event_date >= NOW() " +
            "ORDER BY e.event_date ", nativeQuery = true)
    public List<Event> findIncomingForUser(long userID);

    @Query(value = "SELECT * FROM Event e " +
            "WHERE e.eventid IN " +
            "(SELECT i.event_id  FROM Invitation i WHERE i.invited_user_id = ?1 AND i.status = 0) " +
            "AND e.event_date < NOW() " +
            "ORDER BY e.event_date", nativeQuery = true)
    public List<Event> findFinishedForUser(long userID);

    public List<Event> findEventByOwner(User user);

    @Query("SELECT DISTINCT e.city FROM Event e")
    List<String> findDistinctCities();

    @Query(value = "SELECT * FROM event e " +
            "WHERE e.event_date <= NOW() " +
            "AND e.eventid IN " +
            "(SELECT i.event_id FROM invitation i WHERE i.invited_user_id = ?1 " +
            "AND i.status = 0) " +
            "AND e.eventid NOT IN " +
            "(SELECT r.event_id FROM review r " +
            "WHERE r.reviewer_id = ?1)", nativeQuery = true)
    public List<Event> findEventsToReview(long userID);

}

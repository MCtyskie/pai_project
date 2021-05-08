package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, Long> {
    public Optional<Event> findEventByEventID(long eventID);

    @Query("SELECT * FROM Event e WHERE e.eventID IN (SELECT i.event_ID FROM Invitation i WHERE i.invited_user_id = ?1 AND i.status LIKE \"ACCEPTED\") AND e.event_date >= NOW() ORDER BY e.event_date LIMIT 5")
    public List<Event> findIncomingForUser(long userid);

    @Query("SELECT * FROM Event e WHERE e.eventID IN (SELECT i.event_ID FROM Invitation i WHERE i.invited_user_id = ?1 AND i.status LIKE \"ACCEPTED\") AND e.event_date < NOW() ORDER BY e.event_date LIMIT 5")
    public List<Event> findFinishedForUser(long userid);
}

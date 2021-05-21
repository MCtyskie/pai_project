package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public interface EventRepository extends CrudRepository<Event, Long> {
    public Optional<Event> findEventByEventID(long eventID);

    @Query("SELECT e FROM Event e WHERE e.eventID IN (SELECT i.event.eventID FROM Invitation i WHERE i.invited= ?1 AND i.status LIKE 'ACCEPTED') AND e.eventDate >= NOW() ORDER BY e.eventDate")
    public List<Event> findIncomingForUser(User user);

    @Query("SELECT e FROM Event e WHERE e.eventID IN (SELECT i.event.eventID  FROM Invitation i WHERE i.invited = ?1 AND i.status LIKE 'ACCEPTED') AND e.eventDate < NOW() ORDER BY e.eventDate")
    public List<Event> findFinishedForUser(User user);

}

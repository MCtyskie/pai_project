package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
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

public interface EventRepository extends CrudRepository<Event, Long>, EventRepositoryCustom {
    public Optional<Event> findEventByEventID(long eventID);

    @Query("SELECT * FROM Event e WHERE e.eventID IN (SELECT i.event_ID FROM Invitation i WHERE i.invited_user_id = ?1 AND i.status LIKE \"ACCEPTED\") AND e.event_date >= NOW() ORDER BY e.event_date LIMIT 5")
    public List<Event> findIncomingForUser(long userid);

    @Query("SELECT * FROM Event e WHERE e.eventID IN (SELECT i.event_ID FROM Invitation i WHERE i.invited_user_id = ?1 AND i.status LIKE \"ACCEPTED\") AND e.event_date < NOW() ORDER BY e.event_date LIMIT 5")
    public List<Event> findFinishedForUser(long userid);

}

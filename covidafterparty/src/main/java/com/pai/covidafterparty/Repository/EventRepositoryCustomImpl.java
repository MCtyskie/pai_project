package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public class EventRepositoryCustomImpl implements EventRepositoryCustom{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Event> findByFilters(EventFilters filters){
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Event> query = cb.createQuery(Event.class);
        Root<Event> event = query.from(Event.class);

        Path<String> tagsPath = event.get("tags");
        Path<String> cityPath = event.get("city");
        Path<LocalDateTime> datePath = event.get("eventDate");
        List<Predicate> predicates = new ArrayList<>();

        for (String x : filters.getTags().split(";")) {
            predicates.add(cb.like(tagsPath, "%"+x+"%"));
        }
        predicates.add(cb.like(cityPath, filters.getCity()));
        predicates.add(cb.greaterThanOrEqualTo(datePath, filters.getDate_start().atStartOfDay()));
        predicates.add(cb.lessThan(datePath, filters.getDate_end().plusDays(1).atStartOfDay()));
        query.select(event)
                .where(cb.and(predicates.toArray(new Predicate[predicates.size()])));

        return entityManager.createQuery(query)
                .getResultList();
    }

    @AllArgsConstructor
    @Getter
    @Setter
    public static class EventFilters{
        private String city;
        private String tags;
        private LocalDate date_start;
        private LocalDate date_end;
        private LocalDateTime time_start;
        private LocalDateTime time_end;
    }
}

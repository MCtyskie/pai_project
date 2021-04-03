package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
import org.springframework.data.repository.CrudRepository;

public interface EventRepository extends CrudRepository<Event, Long> {
}

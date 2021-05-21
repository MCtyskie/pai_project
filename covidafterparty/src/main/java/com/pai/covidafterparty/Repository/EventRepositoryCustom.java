package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.List;

@NoRepositoryBean
public interface EventRepositoryCustom {
    List<Event> findByFilters(EventRepositoryCustomImpl.EventFilters filters);
}

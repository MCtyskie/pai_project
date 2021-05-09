package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;

import java.util.List;

public interface EventRepositoryCustom {
    List<Event> findByFilters(EventRepositoryCustomImpl.EventFilters filters);
}

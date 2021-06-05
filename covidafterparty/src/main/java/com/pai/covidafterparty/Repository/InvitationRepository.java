package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.Invitation;
import com.pai.covidafterparty.Model.Review;
import com.pai.covidafterparty.Model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface InvitationRepository extends CrudRepository<Invitation, Long> {
    public Optional<Invitation> findInvitationByInvitationID(long invitationID);
    public List<Invitation> findByEvent(Event event);

    public List<Invitation> findByInvited(User user);
    public List<Invitation> findByInviter(User user);
}

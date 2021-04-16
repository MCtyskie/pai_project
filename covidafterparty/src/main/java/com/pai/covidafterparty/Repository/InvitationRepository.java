package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Invitation;
import com.pai.covidafterparty.Model.Review;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface InvitationRepository extends CrudRepository<Invitation, Long> {
    public Optional<Invitation> findInvitationByInvitationID(long invitationID);
}

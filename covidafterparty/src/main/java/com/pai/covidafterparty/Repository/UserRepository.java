package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Long> {

    public Optional<User> findUserByEmail(String email);
}

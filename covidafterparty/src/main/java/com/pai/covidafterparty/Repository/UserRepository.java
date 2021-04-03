package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {
}

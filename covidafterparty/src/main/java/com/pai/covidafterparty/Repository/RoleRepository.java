package com.pai.covidafterparty.Repository;

import com.pai.covidafterparty.Model.Role;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RoleRepository extends CrudRepository<Role,Integer> {
    public Optional<Role> findRoleByUserRole(String userRole);
}

package com.pai.covidafterparty.Security;

import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class MyUserDetailsImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user=userRepository.findUserByEmail(email).orElse(null);
        if(user==null){
            throw new UsernameNotFoundException("Could not find user!1!!");
        }
        return new MyUserDetails(user);
    }
}

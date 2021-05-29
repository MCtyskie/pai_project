package com.pai.covidafterparty.Service;

import com.pai.covidafterparty.Enums.Activity;
import com.pai.covidafterparty.Enums.Visibility;
import com.pai.covidafterparty.Model.Event;
import com.pai.covidafterparty.Model.User;
import com.pai.covidafterparty.Repository.EventRepository;
import com.pai.covidafterparty.Repository.InvitationRepository;
import com.pai.covidafterparty.Repository.ReviewRepository;
import com.pai.covidafterparty.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class DBPopulateService {
    @Autowired
    UserRepository ur;
    EventRepository er;
    ReviewRepository rr;
    InvitationRepository ir;

    Random random = new Random();

    List<String> SampleTags = List.of("alcohol", "music", "rock", "costume", "new year", "halloween", "celebrity", "adult", "open space", "sport", "concert", "dancing");

    private LocalDate getRandomBirthdate() {
        int year, month, day;
        year = random.nextInt(30) + 15;
        month = random.nextInt(12) + 1;
        day = random.nextInt(28) + 1;
        return LocalDate.of(year, month, day);
    }

    private String getRandomCity() {
        String randomCity = "City ";
        randomCity += random.nextInt(5) + 1;
        return randomCity;
    }

    private String getRandomPhone() {
        String randomPhone = String.valueOf(random.nextInt(9) + 1);
        for (int i = 0; i < 8; i++) {
            randomPhone += String.valueOf(random.nextInt(10));
        }
        return randomPhone;
    }

    public void addNRandomUsers(int n) {
        for (int i = 0; i < n; i++) {
            ur.save(new User("User" + (i + 1), "LastName" + (i + 1), "testEmail" + (i + 1) + "@gmail.com", "password" + (i + 1), getRandomBirthdate(), getRandomCity(), getRandomPhone()));
        }
    }

    public void addNRandomEvents(int n) {
        LocalDateTime eventDate;
        String postNumber;
        String tags = "";
        String randomCity;
        int ageRestriction;
        int maxGuests;
        Iterable<User> users = ur.findAll();
        Activity[] activities = Activity.values();
        Visibility visibility;
        for (int i = 0; i < n; i++) {
            randomCity = getRandomCity();
            eventDate = LocalDateTime.of(LocalDate.now().getYear() + random.nextInt(2) - 1, random.nextInt(12) + 1, random.nextInt(28) + 1, random.nextInt(24) + 1, 0, 0);
//            ageRestriction = random.nextInt(80)-50;
//            if(ageRestriction > 18) ageRestriction = 18;
//            if(ageRestriction <= 0 ) ageRestriction = 0;
            tags += SampleTags.get(random.nextInt(SampleTags.size())) + ",";
            tags += SampleTags.get(random.nextInt(SampleTags.size())) + ",";
            tags += SampleTags.get(random.nextInt(SampleTags.size())) + ",";
            maxGuests = random.nextInt(10) + 1;
            maxGuests *= 100;
            visibility = Visibility.PUBLIC;
            if (random.nextInt(10) > 7) visibility = Visibility.PRIVATE;
            er.save(new Event(users.iterator().next(), "Title" + (i + 1), randomCity, "11-11" + randomCity.charAt(5), "Street " + (i + 1), "HouseNumber" + (i + 1), "ApartmentNumber" + (i + 1), eventDate,
                    activities[random.nextInt(activities.length)], visibility, tags, maxGuests, "Description" + (i + 1), "", false, random.nextBoolean()));
        }
    }

}

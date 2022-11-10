package com.example.neckisturtle.feature.service;

import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.dto.UserInfoDto;
import com.example.neckisturtle.feature.dto.UserUpdateDto;
import com.example.neckisturtle.feature.persistance.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class UserService {

    @Autowired
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public Optional<User> findByEmail(String email) { return userRepo.findByEmail(email); }

    public UserInfoDto getUserInfo(String name) {
        User user = userRepo.findByName(name.toString()).orElseThrow();
        UserInfoDto userInfoDto = UserInfoDto.builder().name(user.getName()).email(user.getEmail())
                .picture(user.getImage_url()).straight_ratio(user.getStraight_ratio()).build();
        return userInfoDto;
    }

    public String setStraightRatio(String name, float ratio){
        try{
            User user = userRepo.findByName(name.toString()).orElseThrow();
            user.setStraightRatio(ratio);
            userRepo.save(user);

            return "성공";
        }catch (Error e){
            log.info("error : {}", e);
            return "실패";
        }
    }
}

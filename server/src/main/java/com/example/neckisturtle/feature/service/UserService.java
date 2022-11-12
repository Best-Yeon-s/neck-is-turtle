package com.example.neckisturtle.feature.service;

import com.example.neckisturtle.feature.Oauth.Token;
import com.example.neckisturtle.feature.Oauth.TokenService;
import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.dto.SigninDto;
import com.example.neckisturtle.feature.dto.SignupDto;
import com.example.neckisturtle.feature.dto.UserInfoDto;
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
    @Autowired
    private final TokenService tokenService;

    public UserService(UserRepo userRepo, TokenService tokenService) {
        this.userRepo = userRepo;
        this.tokenService = tokenService;
    }

    public boolean isExistUser(String email){
        return userRepo.existsByEmail(email);
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

    public String signUp(SignupDto dto){
        if (!userRepo.existsByEmail(dto.getEmail())) {
            Token token = tokenService.generateToken(dto.getEmail(), "USER");
            User user = User.builder()
                    .email(dto.getEmail())
                    .name(dto.getName())
                    .image_url(dto.getPicture())
                    .access_token(token.getToken())
                    .build();
            userRepo.save(user);
            return token.getToken();
        }else {
            return "이미 존재하는 유저입니다.";
        }
    }

    public String signIn(SigninDto dto){
        if (userRepo.existsByEmail(dto.getEmail())){
            User user = userRepo.findByEmail(dto.getEmail()).orElseThrow();
            String accessToken = user.getAccess_token();
            if (accessToken == null || !tokenService.verifyToken(accessToken)){
                Token tokens = tokenService.generateToken(user.getEmail(), "USER");
                user.setAccess_token(tokens.getToken());
                userRepo.save(user);
                return tokens.getToken();
            }else {
                return user.getAccess_token();
            }
        }else{
            return "존재하지 않는 유저입니다.";
        }
    }

    public String modifyName(String email, String name){
        try{
            User user = userRepo.findByEmail(email).orElseThrow();
            user.setName(name);
            userRepo.save(user);
            return "성공";
        }catch (Exception e){
            log.info("error : {}", e);
            return "실패";
        }
    }
}

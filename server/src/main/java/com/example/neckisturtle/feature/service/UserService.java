package com.example.neckisturtle.feature.service;

import com.example.neckisturtle.feature.Oauth.Token;
import com.example.neckisturtle.feature.Oauth.TokenService;
import com.example.neckisturtle.feature.domain.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import com.example.neckisturtle.feature.persistance.UserRepository;

@Slf4j
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private TokenService tokenService;

    public Token signin(OAuth2User oAuth2User) {

        log.info("singin 시작");

        if(!userRepository.existsByEmail(oAuth2User.getAttribute("email"))){
            User user = User.builder()
                    .email(oAuth2User.getAttribute("email"))
                    .name(oAuth2User.getAttribute("name"))
                    .build();
            userRepository.save(user);
        }

        return tokenService.generateToken(oAuth2User);
    }
}

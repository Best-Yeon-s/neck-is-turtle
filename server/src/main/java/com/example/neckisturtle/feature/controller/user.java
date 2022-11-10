package com.example.neckisturtle.feature.controller;

import com.example.neckisturtle.feature.Oauth.UserDto;
import com.example.neckisturtle.feature.dto.UserInfoDto;
import com.example.neckisturtle.feature.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

@RestController
@RequestMapping("/api/v1/user")
@Slf4j
public class user {

    private final UserService userService;

    public user(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signin")
    public String signIn(){
        return "signIn";
    }

    @PostMapping("/signup")
    public String signUp(){
        return "signUp";
    }

    @GetMapping("/user-info")
    public UserInfoDto getUserInfo(@RequestHeader(value="Authorization") String autha, Authentication authentication, Authentication auth){

        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.getUserInfo(userDto.getName());
    }

    @PostMapping("/profile-image")
    public String modifyProfileImage(){
        return "postProfileImage";
    }

    @PutMapping("/name")
    public String modifyName(){
        return "modifyName";
    }

    @PutMapping("/straight-ratio")
    public String setStraightRatio(){
        return "setStraightRatio";
    }
}

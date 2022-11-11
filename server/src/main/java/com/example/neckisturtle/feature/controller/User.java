package com.example.neckisturtle.feature.controller;

import com.example.neckisturtle.feature.Oauth.UserDto;
import com.example.neckisturtle.feature.dto.UserInfoDto;
import com.example.neckisturtle.feature.dto.UserUpdateDto;
import com.example.neckisturtle.feature.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@Slf4j
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
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
    public UserInfoDto getUserInfo(@RequestHeader(value="Authorization") String Authorization){

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
    public String setStraightRatio(@RequestHeader(value="Authorization") String Authorization, @ModelAttribute(name = "update")UserUpdateDto.setStraightRatioDto straightDto){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.setStraightRatio(userDto.getName(), straightDto.getStraightRatio());
    }
}

package com.example.neckisturtle.feature.controller;

import com.example.neckisturtle.feature.Oauth.UserDto;
import com.example.neckisturtle.feature.dto.SigninDto;
import com.example.neckisturtle.feature.dto.SignupDto;
import com.example.neckisturtle.feature.dto.UserInfoDto;
import com.example.neckisturtle.feature.dto.UserUpdateDto;
import com.example.neckisturtle.feature.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin
@Slf4j
public class User {

    private final UserService userService;

    public User(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/exist/{email}")
    public boolean isExistUser(@PathVariable(name = "email") String email){
        return userService.isExistUser(email);
    }

    @PostMapping("/signin")
    public String signIn(@RequestBody SigninDto dto){
        return userService.signIn(dto);
    }
    @PostMapping("/signup")
    public String signUp(@RequestBody SignupDto dto){
        return userService.signUp(dto);
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

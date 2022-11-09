package com.example.neckisturtle.feature.controller;

import com.example.neckisturtle.feature.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class user {

    private UserService userService;

    @PostMapping("/signin")
    public Object signIn(OAuth2User oAuth2User){
        return ResponseEntity.ok(userService.signin(oAuth2User));
    }

    @PostMapping("/signup")
    public String signUp(){
        return "signUp";
    }

    @GetMapping("/user-info")
    public String getUserInfo(){
        return "getUserInfo";
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

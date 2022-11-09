package com.example.neckisturtle.feature.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class user {
    @PostMapping("/signin")
    public String signIn(){
        return "signIn";
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

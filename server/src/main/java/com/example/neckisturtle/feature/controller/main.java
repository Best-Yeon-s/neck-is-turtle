package com.example.neckisturtle.feature.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/test")
public class main {
    @GetMapping
    public String getMain(){
        return "인증 성공했다 아이야";
    }
}

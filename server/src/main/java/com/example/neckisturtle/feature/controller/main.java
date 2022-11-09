package com.example.neckisturtle.feature.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/home")
public class main {
    @GetMapping
    public String getMain(){
        return "메인 페이지 입니다.";
    }
}

package com.example.neckisturtle.feature.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/mission")
public class mission {
    @GetMapping("/today")
    public String getTodayMission(){
        return "getTodayMission";
    }

    @PostMapping("/mission/{missionId}")
    public String missionSuccess(){
        return "missionSuccess";
    }

    @GetMapping("/3month-all")
    public String get3MonthMission(){
        return "get3MonthMission";
    }
}


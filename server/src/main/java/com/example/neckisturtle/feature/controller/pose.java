package com.example.neckisturtle.feature.controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/pose")
public class pose {
    @GetMapping("/today")
    public String getTodayPose(){
        return "getTodayPose";
    }

    @PutMapping("/today/{poseMode}")
    public String modifyTodayPose(){
        return "modifyTodayPose";
    }

    @GetMapping("/pose/week")
    public String getWeekPose(){
        return "getWeekPose";
    }

}

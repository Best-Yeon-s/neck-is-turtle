package com.example.neckisturtle.feature.controller;

import com.example.neckisturtle.feature.security.UserDto;
import com.example.neckisturtle.feature.dto.MissionDto;
import com.example.neckisturtle.feature.service.MissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mission")
@CrossOrigin(origins ="*")
public class mission {
    @Autowired
    private final MissionService missionService;

    public mission(MissionService missionService) {
        this.missionService = missionService;
    }

    @GetMapping("/today")
    public List<MissionDto> getTodayMission(@RequestHeader(value="Authorization") String Authorization){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return missionService.getTodayMission(userDto.getEmail());
    }

    @PostMapping("/{missionId}")
    public String missionSuccess(@RequestHeader(value="Authorization") String Authorization, @PathVariable(name = "missionId") Integer missionId){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return missionService.missionSuccess(missionId, userDto.getEmail());
    }

    @GetMapping("/3month-all")
    public List<MissionDto> get3MonthMission(){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return missionService.get3MonthPose(userDto.getEmail());
    }
}


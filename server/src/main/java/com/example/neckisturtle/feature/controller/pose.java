package com.example.neckisturtle.feature.controller;
import com.example.neckisturtle.feature.Oauth.UserDto;
import com.example.neckisturtle.feature.dto.PutStraightTimeDto;
import com.example.neckisturtle.feature.dto.PutTurtleTimeDto;
import com.example.neckisturtle.feature.dto.TodayPoseDto;
import com.example.neckisturtle.feature.dto.WeekPoseDto;
import com.example.neckisturtle.feature.service.PoseService;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pose")
@CrossOrigin
public class pose {

    private final PoseService poseService;

    public pose(PoseService poseService) {
        this.poseService = poseService;
    }

    @GetMapping("/today")
    public TodayPoseDto getTodayPose(@RequestHeader(value="Authorization") String Authorization){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return poseService.getTodayPose(userDto.getEmail());
    }

    @PostMapping("/today")
    public TodayPoseDto addTodayPose(@RequestHeader(value="Authorization") String Authorization, @RequestBody TodayPoseDto dto) {
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return poseService.addTodayPose(dto, userDto.getEmail());
    }

    @PutMapping("/straight")
    public TodayPoseDto modifyTodayStraightPose(@RequestHeader(value="Authorization") String Authorization,
                                        @RequestBody PutStraightTimeDto dto){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return poseService.modifyTodayStraightPose(dto, userDto.getEmail());
    }

    @PutMapping("/turtle")
    public TodayPoseDto modifyTodayTurtlePose(@RequestHeader(value="Authorization") String Authorization,
                                                @RequestBody PutTurtleTimeDto dto){

        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return poseService.modifyTodayTurtlePose(dto, userDto.getEmail());
    }

    @GetMapping("/pose/week")
    public List<WeekPoseDto> getWeekPose(@RequestHeader(value="Authorization") String Authorization){
        UserDto userDto = (UserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return poseService.getWeekPose(userDto.getEmail());
    }

}

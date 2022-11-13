package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Getter
public class WeekPoseDto {
    private Date regDtm;
    private Integer straightTime;
    private Integer turtleTime;



    @Builder
    public WeekPoseDto(Date date, Integer straightTime, Integer turtleTime) {
        this.regDtm = date;
        this.straightTime = straightTime;
        this.turtleTime = turtleTime;
    }
}
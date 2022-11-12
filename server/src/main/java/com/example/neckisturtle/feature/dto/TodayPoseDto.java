package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class TodayPoseDto {
    private Integer straightTime;
    private Integer turtleTime;


    @Builder
    public TodayPoseDto(Integer straightTime, Integer turtleTime) {
        this.straightTime = straightTime;
        this.turtleTime = turtleTime;
    }
}

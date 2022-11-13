package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PutTurtleTimeDto {
    private Integer turtleTime;

    @Builder
    public PutTurtleTimeDto(Integer turtleTime) {
        this.turtleTime = turtleTime;
    }
}

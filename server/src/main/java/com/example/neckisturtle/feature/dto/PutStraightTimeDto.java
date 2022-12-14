package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PutStraightTimeDto {
    private Integer straightTime;

    @Builder
    public PutStraightTimeDto(Integer straightTime) {
        this.straightTime = straightTime;
    }
}

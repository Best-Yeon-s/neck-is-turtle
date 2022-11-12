package com.example.neckisturtle.feature.dto;

import com.example.neckisturtle.feature.domain.Mission;
import com.example.neckisturtle.feature.domain.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
@Getter
@NoArgsConstructor
public class MissionDto {
    private Integer missionId;

    @Builder
    public MissionDto(Integer mission) {
        this.missionId = mission;
    }
}

package com.example.neckisturtle.feature.dto;

import com.example.neckisturtle.feature.domain.Mission;
import com.example.neckisturtle.feature.domain.User;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;
@Getter
public class MissionDto {
    private Mission missionId;

    @Builder
    public MissionDto(Mission mission) {
        this.missionId = mission;
    }
}

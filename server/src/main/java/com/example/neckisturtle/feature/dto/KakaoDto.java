package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class KakaoDto {

    private String access_token;

    @Builder
    public KakaoDto(String access_token) {
        this.access_token = access_token;
    }
}

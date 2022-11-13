package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class UserInfoDto {
    private String email;
    private String name;
    private String picture;
    private Float straight_ratio;

    @Builder
    public UserInfoDto(String email, String name, String picture, Float straight_ratio) {
        this.email = email;
        this.name = name;
        this.picture = picture;
        this.straight_ratio = straight_ratio;
    }

}

package com.example.neckisturtle.feature.dto;

import lombok.*;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Setter
@Getter
public class PutUsernameDto {
    private String name;

    @Builder
    public PutUsernameDto(String name) {
        this.name = name;
    }
}
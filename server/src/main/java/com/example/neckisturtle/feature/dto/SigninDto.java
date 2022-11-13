package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SigninDto {
    private String email;

    @Builder
    public SigninDto(String email) {
        this.email = email;
    }
}

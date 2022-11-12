package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class SignupDto {
    private String email;
    private String name;
    private String picture;

    @Builder
    public SignupDto(String email, String name, String picture) {
        this.email = email;
        this.name = name;
        this.picture = picture;
    }
}

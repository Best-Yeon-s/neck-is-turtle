package com.example.neckisturtle.feature.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PutUsernamaeDto {
    private String name;

    @Builder
    public PutUsernamaeDto(String name) {
        this.name = name;
    }
}
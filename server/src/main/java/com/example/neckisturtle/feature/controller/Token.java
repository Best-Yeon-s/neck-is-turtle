package com.example.neckisturtle.feature.controller;

import com.example.neckisturtle.core.resultMap;
import com.example.neckisturtle.feature.domain.User;
import com.example.neckisturtle.feature.persistance.UserRepo;
import com.example.neckisturtle.feature.security.TokenService;
import com.example.neckisturtle.feature.security.UserDto;
import com.example.neckisturtle.feature.service.MyTokenService;
import com.example.neckisturtle.feature.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins ="*")
public class Token {
    private final MyTokenService myTokenService;
    private final UserRepo userRepo;

    @GetMapping("/token/expired")
    public String auth() {
        throw new RuntimeException();
    }

    @GetMapping("/token/refresh")
    public resultMap refreshAuth(@RequestHeader(value="Refresh") String refresh, HttpServletRequest request, HttpServletResponse response) {
        return myTokenService.refreshToken(request, response);
    }
}
